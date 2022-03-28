import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notifications';
import { sendCartData } from './store/cart-action';
import { fetchCartData } from './store/cart-action';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isShow = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector((state) => {
    return state.cart
  });

  const notification = useSelector((state) => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData())
  },[])

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed) {
      dispatch(sendCartData(cart))
    }


  //   const sendRequest = async () => {
  //     dispatch(uiActions.showNotification({
  //       status: "pending",
  //       title: "Sending",
  //       message: "Sending cart data!"
  //     }))

  //     const response = await fetch('https://cart-b7213-default-rtdb.firebaseio.com/cart.json',{
  //     method: 'PUT',
  //     body: JSON.stringify(cart),
  //     })

  //     if(!response.ok) {
  //       throw new Error('Something went wrong' + response.status)
  //     }

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!...",
  //         message: "Sent cart data successfully!"
  //       })
  //     )
  //   };

   
  //   sendRequest().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!...",
  //         message: "Sending cart data failed! : " + error,
  //       })
  //     )
  // })
},[cart, dispatch])

  return (
    <Fragment>
      {notification && (
        <Notification 
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
      {isShow && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;

import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(state => state.cart.totalAmount)

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmount}</span>
    </button>
  );
};

export default CartButton;

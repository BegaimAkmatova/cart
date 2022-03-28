import { createSlice } from "@reduxjs/toolkit";
import { findById } from './../utils/helpers';

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalAmount: 0,
        changed: false
    },
    reducers: {
        replaceCart(state, action) {
            state.totalAmount = action.payload.totalAmount;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = findById(state,newItem.id);
            state.totalAmount++;
            state.changed = true;
            if(!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = findById(state,id);
            state.totalAmount--;
            state.changed = true;
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
})


export const cartActions = cartSlice.actions;
export default cartSlice;
import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartCount: 0,
    allCartItems: [],
  },
  reducers: {
    addCartItems: (state, action) => {
      state.cartItems.unshift(action.payload);
    },
    removeCartItems: (state, action) => {
      state.cartItems.filter((item) => item.id != action.payload.id);
    },
    increment: (state, action) => {
      state.cartCount = action.payload;
    },
    decrement: (state, action) => {
      if (action.payload != 0) {
        state.cartCount += action.payload;
      } else {
        state.cartCount = 0;
      }
    },
    getAllCartItems: (state, action) => {
      state.allCartItems = [];
      action.payload.map((item) => {
        state.allCartItems.push(item);
      });
    },
  },
});

export const {
  addCartItems,
  removeCartItems,
  increment,
  decrement,
  getAllCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

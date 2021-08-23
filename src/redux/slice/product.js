import { createSlice } from "@reduxjs/toolkit";
import { home } from "../../api";

export const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    products: [],
    allMajorCategory: [],
    allSubCategory: [],
    categoryProduct: [],
    orders: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
    },
    getAllMajorCategory: (state, action) => {
      state.allMajorCategory = [];
      if (action.payload) {
        action.payload.map((item) => {
          return state.allMajorCategory.push(item);
        });
      }
    },
    getAllSubCategory: (state, action) => {
      state.allSubCategory = [];
      if (action.payload) {
        action.payload.map((item) => {
          state.allSubCategory.push(item);
        });
      }
    },
    getCategoryProduct: (state, action) => {
      state.categoryProduct = [];
      action.payload.map((item) => {
        state.categoryProduct.push(item);
      });
    },
    addOrders: (state, action) => {
      state.orders = [];
      state.orders.unshift(action.payload);
    },
  },
});

export const {
  addProduct,
  getAllMajorCategory,
  getAllSubCategory,
  getCategoryProduct,
  getNewProduct,
  addOrders,
} = addProductSlice.actions;

export default addProductSlice.reducer;

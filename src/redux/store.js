import { configureStore } from "@reduxjs/toolkit";
import products from "./slice/product";
import users from "./slice/users";
import cartBucket from "./slice/Cart";

export default configureStore({
  reducer: {
    products,
    users,
    cartBucket,
  },
});

import { createSlice } from "@reduxjs/toolkit";

export const Users = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getUserRegisterData: (state, action) => {
      state.users = [];
      state.users.unshift(action.payload);
    },
  },
});

export const { getUserRegisterData } = Users.actions;

export default Users.reducer;

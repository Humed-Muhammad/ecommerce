import { createSlice } from "@reduxjs/toolkit";

export const Users = createSlice({
  name: "users",
  initialState: {
    users: [],
    loggedInUser: [],
  },
  reducers: {
    getUserRegisterData: (state, action) => {
      state.users = [];
      state.users.unshift(action.payload);
    },
    getLoggedInUser: (state, action) => {
      state.loggedInUser = [];
      state.loggedInUser.unshift(action.payload);
    },
  },
});

export const { getUserRegisterData, getLoggedInUser } = Users.actions;

export default Users.reducer;

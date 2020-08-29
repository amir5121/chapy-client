import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth/login", authData => {
  return axios.post("api/user", {
    username: authData.username,
    password: authData.password,
  });
});

export const authSlice = createSlice({
  name: "self",
  initialState: {
    status: "idle",
  },
  reducers: {},

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
      console.log("assss, loading");
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("assss, success");
      // Add any fetched posts to the array
      state.posts = state.posts.concat(action.payload);
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      console.log("assss, failed");
      state.error = action.error.message;
    },
  },
});

export const { updateUserMessages, sendMessage } = authSlice.actions;

export const selectUsers = (state) => state.chat.users;

export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn, saveAuthToken } from "../../utils/Authenticate";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const loginUser = createAsyncThunk(
  "auth/login",
  chapios.post("/api/auth/token/login/"),
  {
    condition: (authData, { getState, extra }) => {
      const { auth } = getState();
      if ([FULFILLED, PENDING].includes(auth.login_status)) {
        return false;
      }
    },
  }
);

export const loginSlice = createSlice({
  name: "auth",
  initialState: {
    status: isLoggedIn() ? FULFILLED : IDLE,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = PENDING;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = FULFILLED;
      console.log("@#!@#!@#");
      saveAuthToken(action.payload);
    },
    [loginUser.rejected]: (state, action) => {
      state.status = REJECTED;
      state.error = action.error.message;
    },
  },
});

// export const authSelector = (state) => state.auth;
export default loginSlice.reducer;

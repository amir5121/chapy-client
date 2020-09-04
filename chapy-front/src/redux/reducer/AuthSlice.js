import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn, saveAuthToken } from "../../utils/Authenticate";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (authData) => {
    let res = await chapios.post("auth/token/login/", {
      email: authData.email,
      password: authData.password,
    });
    return res.data;
  },
  {
    condition: (authData, { getState, extra }) => {
      const { auth } = getState();
      console.log(auth.login_status);
      if (["fulfilled", "loading"].includes(auth.login_status)) {
        return false;
      }
    },
  }
);

export const getMe = createAsyncThunk(
  "user/me",
  async () => {
    let res = await chapios.get("api/users/me/");
    return res.data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { auth } = getState();
      console.log(auth.me_status);
      if (!isLoggedIn() || ["fulfilled", "loading"].includes(auth.me_status)) {
        return false;
      }
    },
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    login_status: isLoggedIn() ? "succeeded" : "idle",
    me_status: "idle",
    me: {},
  },
  reducers: {},

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.login_status = "loading";
      console.log("assss, loading");
    },
    [loginUser.fulfilled]: (state, action) => {
      state.login_status = "succeeded";
      console.log("assss, success", action.payload);
      saveAuthToken(action.payload);
    },
    [loginUser.rejected]: (state, action) => {
      state.login_status = "failed";
      console.log("assss, failed");
      state.error = action.error.message;
    },
    [getMe.pending]: (state, action) => {
      state.me_status = "loading";
      console.log("meeee, loading");
    },
    [getMe.fulfilled]: (state, action) => {
      state.me = action.payload;
      state.me_status = "succeeded";
      console.log("meee, success", action.payload);
    },
    [getMe.rejected]: (state, action) => {
      state.succeeded = "failed";
      console.log("meee, failed");
      state.error = action.error.message;
    },
  },
});

export const authSelector = (state) => state.auth;
export const selectMe = createSelector([authSelector], (auth) => auth.me);
export default authSlice.reducer;

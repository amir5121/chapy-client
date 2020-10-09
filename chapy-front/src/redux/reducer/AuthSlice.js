import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn, saveAuthToken } from "../../utils/Authenticate";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const registerUser = createAsyncThunk(
  "auth/register",
  chapios.post("/api/auth/users/"),
  {
    condition: (authData, { getState, extra }) => {
      const { auth } = getState();
      if ([FULFILLED, PENDING].includes(auth.status)) {
        return false;
      }
    },
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",

  (_, thunkAPI) => {
    const registrationId = thunkAPI.getState().notification.registrationId;
    console.log("@#@#@#((((((9999", registrationId);
    return chapios.post(`/api/users/logout/`)(
      { registration_id: registrationId },
      thunkAPI
    );
  },
  {
    condition: () => {
      return isLoggedIn();
    },
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  chapios.post("/api/auth/token/login/"),
  {
    condition: (authData, { getState, extra }) => {
      const { auth } = getState();
      if ([FULFILLED, PENDING].includes(auth.status)) {
        return false;
      }
    },
  }
);

export const authSlice = createSlice({
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

    [registerUser.pending]: (state, action) => {
      state.status = PENDING;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = FULFILLED;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = REJECTED;
    },
  },
});

export const selectRegisterState = (state) => state.auth.state;

export const authStateSelector = (state) => state.auth.status;
export default authSlice.reducer;

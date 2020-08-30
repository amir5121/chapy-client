import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      console.log(auth.status);
      if (["fulfilled", "loading"].includes(auth.status)) {
        return false;
      }
    },
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: isLoggedIn() ? "succeeded" : "idle",
  },
  reducers: {},

  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "loading";
      console.log("assss, loading");
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log("assss, success", action.payload);
      saveAuthToken(action.payload);
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      console.log("assss, failed");
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;

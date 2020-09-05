import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { saveAuthToken } from "../../utils/Authenticate";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (authData) => {
    let res = await chapios.post("/api/auth/users/", {
      email: authData.email,
      password: authData.password,
    });
    return res.data;
  },
  {
    condition: (authData, { getState, extra }) => {
      const { auth } = getState();
      if ([FULFILLED, PENDING].includes(auth.register_status)) {
        return false;
      }
    },
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    status: IDLE,
    error: null,
  },
  reducers: {},

  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.status = PENDING;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = FULFILLED;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = REJECTED;
      state.error = action.error.message;
    },
  },
});

export default registerSlice.reducer;

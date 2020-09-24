import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const registerUser = createAsyncThunk(
  "auth/register",
  chapios.post("/api/auth/users/"),
  {
    condition: (authData, { getState, extra }) => {
      const { register } = getState();
      if ([FULFILLED, PENDING].includes(register.status)) {
        return false;
      }
    },
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    status: IDLE,
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
    },
  },
});
export const selectRegisterState = (state) => state.register.state;
export default registerSlice.reducer;

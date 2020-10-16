import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const filePut = createAsyncThunk(
  "file/upload",
  chapios.upload(`/api/utils/upload/`),
  {
    condition: (_, { getState, extra }) => {
      const { file } = getState();
      if (file.status === PENDING) {
        return false;
      }
    },
  }
);

export const fileSlice = createSlice({
  name: "file",
  initialState: {},
  reducers: {},
  extraReducers: {
    [filePut.fulfilled]: (state, action) => {
      state.status = IDLE;
      console.log(action.payload);
    },
    [filePut.pending]: (state, action) => {
      state.status = PENDING;
    },
    [filePut.rejected]: (state, action) => {
      state.status = REJECTED;
    },
  },
});

export default fileSlice.reducer;

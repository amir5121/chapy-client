import {createAsyncThunk, createSelector, createSlice,} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import {isLoggedIn} from "../../utils/Authenticate";
import {FULFILLED, IDLE, PENDING, REJECTED} from "../../utils/Constatns";

export const getMe = createAsyncThunk(
  "user/me",
  async () => {
    let res = await chapios.get("/api/users/me/");
    return res.data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { auth } = getState();
      console.log(auth.me_status);
      if (!isLoggedIn() || [FULFILLED, PENDING].includes(auth.me_status)) {
        return false;
      }
    },
  }
);

export const meSlice = createSlice({
  name: "me",
  initialState: {
    status: IDLE,
    error: null,
    data: {},
  },
  reducers: {},

  extraReducers: {
    [getMe.pending]: (state, action) => {
      state.me_status = PENDING;
    },
    [getMe.fulfilled]: (state, action) => {
      state.me = action.payload;
      state.me_status = FULFILLED;
    },
    [getMe.rejected]: (state, action) => {
      state.succeeded = REJECTED;
      state.error = action.error.message;
    },
  },
});

export const meSelector = (state) => state.me;
export const selectMe = createSelector([meSelector], (auth) => auth.data);
export default meSlice.reducer;

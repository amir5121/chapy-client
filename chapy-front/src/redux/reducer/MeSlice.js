import {createAsyncThunk, createSelector, createSlice,} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import {isLoggedIn} from "../../utils/Authenticate";
import {FULFILLED, IDLE, PENDING, REJECTED} from "../../utils/Constatns";

export const getMe = createAsyncThunk(
  "me/get",
  async () => {
    let res = await chapios.get("/api/users/me/");
    return res.data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { auth } = getState();
      console.log(auth.status);
      if (!isLoggedIn() || [FULFILLED, PENDING].includes(auth.me_status)) {
        return false;
      }
    },
  }
);


export const updateMe = createAsyncThunk(
  "me/update",
  async (profileData) => {
    let res = await chapios.post("/api/users/me/", {
      ...profileData
    });
    return res.data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { auth } = getState();
      if ([FULFILLED, PENDING].includes(auth.me_update_status)) {
        return false;
      }
    },
  }
);

export const meSlice = createSlice({
  name: "me",
  initialState: {
    status: IDLE,
    me_update_status: IDLE,
    error: null,
    data: {},
  },
  reducers: {},

  extraReducers: {
    [getMe.pending]: (state, action) => {
      state.status = PENDING;
    },
    [getMe.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.status = FULFILLED;
    },
    [getMe.rejected]: (state, action) => {
      state.status = REJECTED;
      state.error = action.error.message;
    },
    [updateMe.pending]: (state, action) => {
      state.me_update_status = PENDING;
    },
    [updateMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.me_update_status = FULFILLED;
    },
    [updateMe.rejected]: (state, action) => {
      state.me_update_status = REJECTED;
      state.error = action.error.message;
    },
  },
});

export const meSelector = (state) => state.me;
export const selectMe = createSelector([meSelector], (me) => me.data);
export default meSlice.reducer;

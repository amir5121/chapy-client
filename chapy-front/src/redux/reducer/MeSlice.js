import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn } from "../../utils/Authenticate";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const getMe = createAsyncThunk("me/get", chapios.get("/api/users/me/"), {
  condition: (_, { getState, extra }) => {
    const { me } = getState();
    if (!isLoggedIn() || [FULFILLED, PENDING].includes(me.status)) {
      return false;
    }
  },
});
export const syncInstagram = createAsyncThunk(
  "me/syncInstagram`",
  chapios.get("/api/instagram/authenticate/"),
  {
    condition: (_, { getState, extra }) => {
      const { me } = getState();
      if (!isLoggedIn() || [FULFILLED, PENDING].includes(me.sync_status)) {
        return false;
      }
    },
  }
);

export const submitInstagram = createAsyncThunk(
  "me/syncInstagram`",
  chapios.post("/api/instagram/authorize/")
);

export const updateMe = createAsyncThunk(
  "me/update",
  chapios.post("/api/users/me/"),
  {
    condition: (_, { getState, extra }) => {
      const { me } = getState();
      if ([FULFILLED, PENDING].includes(me.me_update_status)) {
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
    sync_status: IDLE,
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
      state.me_update_status = FULFILLED;
    },
    [updateMe.rejected]: (state, action) => {
      state.me_update_status = REJECTED;
      state.error = action.error.message;
    },
    [syncInstagram().pending]: (state, action) => {
      state.sync_status = PENDING;
    },
    [syncInstagram.fulfilled]: (state, action) => {
      state.sync_status = IDLE;
    },
    [syncInstagram.rejected]: (state, action) => {
      state.sync_status = REJECTED;
      state.error = action.error.message;
    },
  },
});

export const meSelector = (state) => state.me;
export const selectMe = createSelector([meSelector], (me) => me.data);
export default meSlice.reducer;

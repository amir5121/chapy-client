import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DENIED,
  FULFILLED,
  GRANTED,
  IDLE,
  PENDING,
  REJECTED,
} from "../../utils/Constatns";
import chapios from "../../utils/Chapios";

export const registerBrowser = createAsyncThunk(
  "notification/register",
  chapios.post(`api/gcm/`)
);
export const configSlice = createSlice({
  name: "notification",
  initialState: {
    notificationPermission:
      typeof window === "undefined" ? DENIED : window.Notification.permission,
    notificationStatus: IDLE,
  },
  reducers: {},
  extraReducers: {
    [registerBrowser.fulfilled]: (state, action) => {
      state.notificationStatus = FULFILLED;
      // state.configurations = action.payload.data;
    },
    [registerBrowser.pending]: (state, action) => {
      state.notificationStatus = PENDING;
    },
    [registerBrowser.rejected]: (state, action) => {
      state.notificationStatus = REJECTED;
    },
  },
});
export const notificationPermissionSelector = (state) => state.notification.isMobile;
export const getConfigs = (state) => state.notification.configurations;

export default configSlice.reducer;

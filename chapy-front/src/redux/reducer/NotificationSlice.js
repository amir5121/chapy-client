import firebase from "firebase/app";
import "firebase/messaging";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  DENIED,
  FIREBASE_CONFIG,
  FULFILLED,
  IDLE,
  PENDING,
  REJECTED,
} from "../../utils/Constatns";
import chapios from "../../utils/Chapios";
import { applicationServerKey } from "../../LocalSetting";

export const registerBrowser = createAsyncThunk(
  "notification/register",
  chapios.post(`api/gcm/`)
);
export const getRegistrationId = createAsyncThunk(
  "notification/getRegistrationId",
  () => {
    firebase.initializeApp(FIREBASE_CONFIG);
    return firebase.messaging().getToken({ vapidKey: applicationServerKey });
  },
  {
    condition: (_, { getState, extra }) => {
      return getState().notification.registrationId === null;
    },
  }
);
export const configSlice = createSlice({
  name: "notification",
  initialState: {
    notificationPermission:
      typeof window === "undefined" ? DENIED : window.Notification.permission,
    notificationStatus: IDLE,
    registrationStatus: IDLE,
    registrationId: null,
  },
  reducers: {
    registerForNotification: (state) => {
      if (window) {
        state.viewportWidth = window.innerWidth;
        state.isMobile = window.innerWidth < 576;
      }
    },
  },
  extraReducers: {
    [registerBrowser.fulfilled]: (state, action) => {
      state.notificationStatus = FULFILLED;
    },
    [registerBrowser.pending]: (state, action) => {
      state.notificationStatus = PENDING;
    },
    [registerBrowser.rejected]: (state, action) => {
      state.notificationStatus = REJECTED;
    },
    [getRegistrationId.fulfilled]: (state, action) => {
      state.registrationStatus = FULFILLED;
      state.registrationId = action.payload;
    },
    [getRegistrationId.pending]: (state, action) => {
      state.registrationStatus = PENDING;
    },
    [getRegistrationId.rejected]: (state, action) => {
      state.registrationStatus = REJECTED;
    },
  },
});
export const notificationPermissionSelector = (state) =>
  state.notification.isMobile;
export const getConfigs = (state) => state.notification.configurations;

export default configSlice.reducer;

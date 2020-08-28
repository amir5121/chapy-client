import { createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    state: "DISCONNECTED",
  },
  reducers: {
    connecting: (state) => {
      state.state = "CONNECTING";
    },
    connected: (state) => {
      state.state = "CONNECTED";
    },
    disconnected: (state) => {
      state.state = "DISCONNECTED";
    },
    connect: (state) => {
      state.state = "CONNECTING";
    },
    disconnect: (state) => {
      state.state = "DISCONNECTED";
    },
  },
});

export const {
  connect,
  connecting,
  connected,
  disconnect,
  disconnected,
} = socketSlice.actions;

export default socketSlice.reducer;

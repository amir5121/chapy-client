import { createSlice } from "@reduxjs/toolkit";
import { CONNECTED, CONNECTING, DISCONNECTED } from "../../utils/Constatns";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    state: DISCONNECTED,
  },
  reducers: {
    connecting: (state) => {
      state.state = CONNECTING;
    },
    connected: (state) => {
      state.state = CONNECTED;
    },
    disconnect: (state) => {
      state.state = DISCONNECTED;
    },
    disconnected: (state) => {
      state.state = DISCONNECTED;
    },
    connect: (state) => {
      state.state = CONNECTING;
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

export const socketStatus = (state) => state.socket?.state;

export default socketSlice.reducer;

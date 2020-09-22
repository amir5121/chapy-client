import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";
import chapios from "../../utils/Chapios";

export const initialConfig = createAsyncThunk(
  "configuration/initial",
  chapios.get(`/api/configuration/initial/`),
  {
    condition: (conversationIdentifier, { getState, extra }) => {
      const { config } = getState();
      if (
        [FULFILLED, PENDING].includes(
          config.configurationStatus || config.configurations
        )
      ) {
        return false;
      }
    },
  }
);
export const configSlice = createSlice({
  name: "config",
  initialState: {
    configurationStatus: IDLE,
    configurations: null,
    isMobile: null,
    viewportWidth: null,
  },
  reducers: {
    viewportUpdated: (state) => {
      if (window) {
        state.viewportWidth = window.innerWidth;
        state.isMobile = window.innerWidth < 576;
        // state.isMobile = window.innerWidth < 425;
      }
    },
  },
  extraReducers: {
    [initialConfig.fulfilled]: (state, action) => {
      state.configurationStatus = FULFILLED;
      state.configurations = action.payload.data;
    },
    [initialConfig.pending]: (state, action) => {
      state.configurationStatus = PENDING;
    },
    [initialConfig.rejected]: (state, action) => {
      state.configurationStatus = REJECTED;
    },
  },
});
export const { viewportUpdated } = configSlice.actions;
export const isMobileSelector = (state) => state.config.isMobile;
export const getConfigs = (state) => state.config.configurations;

export default configSlice.reducer;

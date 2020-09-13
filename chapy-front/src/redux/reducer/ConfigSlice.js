import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

export const initialConfig = createAsyncThunk(
  "configuration/initial",
  async () => {
    let res = await chapios.get(`/api/configuration/initial/`);
    return res.data.data;
  },
  {
    condition: (conversationIdentifier, { getState, extra }) => {
      const { config } = getState();
      if ([FULFILLED, PENDING].includes(config.configurationStatus)) {
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
        state.isMobile = window.innerWidth < 425;
      }
    },
  },
  extraReducers: {
    [initialConfig.fulfilled]: (state, action) => {
      state.configurationStatus = FULFILLED;
      state.configurations = action.payload;
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

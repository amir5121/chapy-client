import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "config",
  initialState: {
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
});
export const { viewportUpdated } = configSlice.actions;

export default configSlice.reducer;

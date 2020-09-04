import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn } from "../../utils/Authenticate";

const profileAdapter = createEntityAdapter({
  selectId: (instance) => instance.email,
});

const initialState = profileAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const getProfile = createAsyncThunk(
  "user/profile",
  async (username) => {
    let res = await chapios.get(`api/users/profile/${username}`);
    return res.data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { profiles } = getState();
      console.log(profiles.status);
      if (!isLoggedIn() || ["fulfilled", "loading"].includes(profiles.status)) {
        return false;
      }
    },
  }
);

export const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {},
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      console.log("getProfile.fulfilled", action.payload.data, state);
      profileAdapter.upsertOne(state, action.payload.data);
    },
    [getProfile.pending]: (state, action) => {
      console.log("getProfile.pending", action.payload);
    },
    [getProfile.rejected]: (state, action) => {
      console.log("getProfile.rejected", action.payload);
    },
  },
});

export const {
  selectAll: selectAllProfiles,
  selectById: selectProfileById,
  selectIds: selectProfileIds,
} = profileAdapter.getSelectors((state) => state && state.profiles);

export default profileSlice.reducer;

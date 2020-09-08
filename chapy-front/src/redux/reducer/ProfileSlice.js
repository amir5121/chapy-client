import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn } from "../../utils/Authenticate";
import {FULFILLED, IDLE, PENDING, REJECTED} from "../../utils/Constatns";

const profileAdapter = createEntityAdapter({
  selectId: (instance) => instance.email,
});

const initialState = profileAdapter.getInitialState({
  status: IDLE,
  error: null,
});

export const getProfile = createAsyncThunk(
  "user/profile",
  async (username) => {
    let res = await chapios.get(`/api/users/profile/${username}`);
    return res.data;
  },
  {
    condition: (_, { getState, extra }) => {
      const { profiles } = getState();
      console.log(profiles.status);
      if (!isLoggedIn() || [FULFILLED, PENDING].includes(profiles.status)) {
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
      state.status = FULFILLED
      profileAdapter.upsertOne(state, action.payload.data);
    },
    [getProfile.pending]: (state, action) => {
      state.status = PENDING
    },
    [getProfile.rejected]: (state, action) => {
      state.status = REJECTED
    },
  },
});

export const {
  selectAll: selectAllProfiles,
  selectById: selectProfileById,
  selectIds: selectProfileIds,
} = profileAdapter.getSelectors((state) => state && state.profiles);

export default profileSlice.reducer;
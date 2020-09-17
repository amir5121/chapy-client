import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn } from "../../utils/Authenticate";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

const profileAdapter = createEntityAdapter({
  selectId: (instance) => instance.email,
});

const initialState = profileAdapter.getInitialState({
  status: IDLE,
  error: null,
});

export const getProfile = createAsyncThunk(
  "user/profile",
  (username, thunkAPI) => {
    return chapios.get(`/api/users/profile/${username}`)(null, thunkAPI);
  },
  {
    condition: (_, { getState, extra }) => {
      const { profiles } = getState();
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
      state.status = FULFILLED;
      profileAdapter.upsertOne(state, action.payload.data);
    },
    [getProfile.pending]: (state, action) => {
      state.status = PENDING;
    },
    [getProfile.rejected]: (state, action) => {
      state.status = REJECTED;
    },
  },
});

export const {
  selectAll: selectAllProfiles,
  selectById: selectProfileById,
  selectIds: selectProfileIds,
} = profileAdapter.getSelectors((state) => state?.profiles);

export default profileSlice.reducer;

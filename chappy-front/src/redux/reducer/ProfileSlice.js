import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { isLoggedIn } from "../../utils/Authenticate";

const profileAdapter = createEntityAdapter({
  selectId: (instance) => instance.conversationIdentifier,
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
      const { auth } = getState();
      console.log(auth.me_status);
      if (!isLoggedIn() || ["fulfilled", "loading"].includes(auth.me_status)) {
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
      console.log("getProfile.fulfilled", action.payload.data);
      profileAdapter.upsertOne(state, {
        conversationIdentifier: action.payload.conversationIdentifier,
        messages: action.payload.data.results,
      });
    },
    [getProfile.pending]: (state, action) => {
      console.log("getProfile.pending", action.payload);
    },
    [getProfile.rejected]: (state, action) => {
      console.log("getProfile.rejected", action.payload);
    },
  },
});

export const { updateUserMessages, sendMessage } = profileSlice.actions;
export const {
  selectAll: selectAllProfiles,
  selectById: selectProfileById,
  selectIds: selectProfileIds,
} = profileAdapter.getSelectors((state) => state.messages);

export default profileSlice.reducer;

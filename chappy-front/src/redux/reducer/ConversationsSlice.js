import chapios from "../../utils/Chapios";

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { authSelector } from "./AuthSlice";

const conversationAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
  selectId: (instance) => instance.identifier,
});

const initialState = conversationAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const getConversations = createAsyncThunk(
  "conversations/list",
  async (username) => {
    const res = await chapios.get(
      `api/chat/conversations/${username ? username + "/" : ""}`
    );
    return res.data;
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: {
    [getConversations.fulfilled]: (state, action) => {
      console.log("getConversations.fulfilled", action);
      action.meta.arg
        ? conversationAdapter.upsertOne(state, action.payload.data)
        : conversationAdapter.upsertMany(state, action.payload.data.results);
    },
    [getConversations.pending]: (state, action) => {
      console.log("getConversations.fulfilled", action.payload);
    },
    [getConversations.rejected]: (state, action) => {
      console.log("getConversations.fulfilled", action.payload);
    },
  },
});

// export const {  } = conversationsSlice.actions;
export const {
  selectAll: selectAllConversations,
  selectById: selectConversationById,
  selectIds: selectConversationIds,
  // Pass in a selector that returns the posts slice of state
} = conversationAdapter.getSelectors((state) => state.conversations);

export const selectConversationIdentifier = (username) =>
  createSelector([selectAllConversations], (conversations) => {
    console.log(
      "ggggggggggggggggggg",
      conversations,
      conversations.filter((it) => it.user.username === username)
    );
    let selectedConversation = conversations.filter(
      (it) => it.user.username === username
    );
    return selectedConversation.length > 0
      ? selectedConversation[0].identifier
      : null;
  });

export default conversationsSlice.reducer;

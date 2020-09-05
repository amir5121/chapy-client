import chapios from "../../utils/Chapios";

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {FULFILLED, IDLE, PENDING, REJECTED} from "../../utils/Constatns";

const conversationAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
  selectId: (instance) => instance.identifier,
});

const initialState = conversationAdapter.getInitialState({
  status: IDLE,
  error: null,
});

export const getConversations = createAsyncThunk(
  "conversationsList/list",
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
      state.status = FULFILLED
      action.meta.arg
        ? conversationAdapter.upsertOne(state, action.payload.data)
        : conversationAdapter.upsertMany(state, action.payload.data.results);
    },
    [getConversations.pending]: (state, action) => {
      state.status = PENDING
    },
    [getConversations.rejected]: (state, action) => {
      state.status = REJECTED
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
    let selectedConversation = conversations.filter(
      (it) => it.user.username === username
    );
    return selectedConversation.length > 0
      ? selectedConversation[0].identifier
      : null;
  });

export default conversationsSlice.reducer;

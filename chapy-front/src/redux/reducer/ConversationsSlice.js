import chapios from "../../utils/Chapios";

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { IDLE, PENDING, REJECTED } from "../../utils/Constatns";
import { isLoggedIn } from "../../utils/Authenticate";

const conversationAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
  selectId: (instance) => instance.identifier,
});

const initialState = conversationAdapter.getInitialState({
  status: IDLE,
  error: null,
});

export const createConversation = createAsyncThunk(
  "conversations/create",
  chapios.post(`/api/chat/conversations/`)
);

export const getConversations = createAsyncThunk(
  "conversations/list",
  (username, thunkAPI) => {
    return chapios.get(
      `api/chat/conversations/${username ? username + "/" : ""}`
    )(null, thunkAPI);
  },
  {
    condition: (_, { getState, extra }) => {
      const { conversations } = getState();
      if (!isLoggedIn() || conversations.status === PENDING || conversations.ids.length > 1) {
        return false;
      }
    },
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: {
    [getConversations.fulfilled]: (state, action) => {
      state.status = IDLE;
      action.meta.arg
        ? conversationAdapter.upsertOne(state, action.payload.data)
        : conversationAdapter.upsertMany(state, action.payload.data.results);
    },
    [getConversations.pending]: (state, action) => {
      state.status = PENDING;
    },
    [getConversations.rejected]: (state, action) => {
      state.status = REJECTED;
    },
    [createConversation.fulfilled]: (state, action) => {
      console.log("fulfilled #!@#!@#------------", action.payload);
      // conversationAdapter.upsertOne(state, action.payload.data)
    },
    [createConversation.pending]: (state, action) => {
      console.log("pending #!@#!@#------------", action.payload);
    },
    [createConversation.rejected]: (state, action) => {
      console.log("rejected #!@#!@#------------", action.payload);
    },
  },
});

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
export const getConversationsStateSelector = (state) =>
  state.conversations.status;

export default conversationsSlice.reducer;

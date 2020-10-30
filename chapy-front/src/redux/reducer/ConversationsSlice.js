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
  sortComparer: (a, b) => {
    // console.log(a.last_message.text, b.last_message.text)
    // console.log(a.last_message.created, b.last_message.created, a.last_message.created > b.last_message.created)
    return a.last_message.created > b.last_message.created;
  },
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
      if (
        !isLoggedIn() ||
        conversations.status === PENDING ||
        conversations.ids.length > 1
      ) {
        return false;
      }
    },
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    updateLastMessage: {
      reducer(state, action) {
        const conversation = conversationAdapter
          .getSelectors()
          .selectById(state, action.payload.conversation);
        conversation.last_message = action.payload.message;

      },
      prepare(conversationIdentifier, message) {
        return {
          payload: { conversation: conversationIdentifier, message },
        };
      },
    },
  },
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
      // conversationAdapter.upsertOne(state, action.payload.data)
    },
    [createConversation.pending]: (state, action) => {},
    [createConversation.rejected]: (state, action) => {},
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

export const { updateLastMessage } = conversationsSlice.actions;
export default conversationsSlice.reducer;

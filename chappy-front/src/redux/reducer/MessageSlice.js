import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";

const messagesAdapter = createEntityAdapter({
  selectId: (instance) => instance.conversationIdentifier,
});

const initialState = messagesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const initialConversationMessage = createAsyncThunk(
  "message/initial",
  async (conversationIdentifier) => {
    let res = await chapios.get(`/api/chat/message/${conversationIdentifier}`);
    return {
      conversationIdentifier,
      data: res.data.data,
    };
  },
  {
    condition: (conversationIdentifier, { getState, extra }) => {
      if (
        selectConversationIdentifiers(getState()).includes(
          conversationIdentifier
        )
      ) {
        console.log("ASDASDASDASDASDASD Cannenellll");
        return false;
      }
    },
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateUserMessages: {
      reducer(state, action) {
        const conversationIdentifier = action.payload.conversationIdentifier;
        const message = action.payload.message;
        const conversationMessages = messagesAdapter
          .getSelectors()
          .selectById(state, conversationIdentifier);
        conversationMessages
          ? messagesAdapter.updateOne(state, {
              id: conversationIdentifier,
              changes: {
                messages: conversationMessages.messages.concat(message),
              },
            })
          : messagesAdapter.addOne(state, {
              conversationIdentifier,
              messages: [message],
            });
      },
      prepare(conversationIdentifier, message) {
        return {
          payload: { conversationIdentifier, message },
        };
      },
    },
    sendMessage: (state, action) => {
      // handled by middleware
    },
  },
  extraReducers: {
    [initialConversationMessage.fulfilled]: (state, action) => {
      console.log("initialConversationMessage.fulfilled", action.payload.data);
      messagesAdapter.upsertOne(state, {
        conversationIdentifier: action.payload.conversationIdentifier,
        messages: action.payload.data.results,
      });
    },
    [initialConversationMessage.pending]: (state, action) => {
      console.log("initialConversationMessage.pending", action.payload);
    },
    [initialConversationMessage.rejected]: (state, action) => {
      console.log("initialConversationMessage.rejected", action.payload);
    },
  },
});

export const { updateUserMessages, sendMessage } = messageSlice.actions;
export const {
  selectAll: selectAllConversationMessages,
  selectById: selectMessagesByConversationIdentifier,
  selectIds: selectConversationIdentifiers,
} = messagesAdapter.getSelectors((state) => state.messages);

export default messageSlice.reducer;

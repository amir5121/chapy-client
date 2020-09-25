import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { chain } from "lodash";
import chapios from "../../utils/Chapios";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

const messagesAdapter = createEntityAdapter({
  selectId: (instance) => instance.conversationIdentifier,
});

const initialState = messagesAdapter.getInitialState({
  status: IDLE,
  acceptChargeStatus: IDLE,
  error: null,
});

export const initialConversationMessage = createAsyncThunk(
  "message/initial",
  async (conversationIdentifier, thunkAPI) => {
    const messages = selectMessagesByConversationIdentifier(
      thunkAPI.getState(),
      conversationIdentifier
    );

    const res = await chapios.get(
      messages && messages.next
        ? messages.next
        : `/api/chat/message/${conversationIdentifier}`
    )(null, thunkAPI);

    return {
      conversationIdentifier,
      data: res.data,
    };
  },
  {
    condition: (conversationIdentifier, { getState, extra }) => {
      const state = getState();

      const messages = selectMessagesByConversationIdentifier(
        state,
        conversationIdentifier
      );
      return !Boolean(messages) || Boolean(messages.next);
    },
  }
);
export const acceptMessageCharge = createAsyncThunk(
  "message/accept",
  async (data, thunkAPI) => {
    const { conversationIdentifier, messageId } = data;
    const res = await chapios.patch(
      `/api/chat/message/${conversationIdentifier}/${messageId}/`
    )({ state: "charged" }, thunkAPI);
    return {
      conversationIdentifier,
      data: res.data,
    };
  },
  {
    condition: (conversationIdentifier, { getState, extra }) => {
      if (
        [FULFILLED, PENDING].includes(getState().messages.acceptChargeStatus)
      ) {
        return false;
      }
    },
  }
);

export const sendMessageHttp = createAsyncThunk(
  "message/send",
  (data, thunkAPI) => {
    const { conversationIdentifier } = data;
    data.conversation = conversationIdentifier;
    let res = chapios.post(`/api/chat/message/${conversationIdentifier}/`)(
      data,
      thunkAPI
    );
    return {
      conversationIdentifier,
      data: res.data.data,
    };
  },
  {
    // condition: (conversationIdentifier, { getState, extra }) => {
    //   if (
    //     selectConversationIdentifiers(getState()).includes(
    //       conversationIdentifier
    //     )
    //   ) {
    //     console.log("ASDASDASDASDASDASD Cannenellll");
    //     return false;
    //   }
    // },
  }
);

function insertMessage(state, action) {
  const conversationIdentifier = action.payload.conversation;
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
}
export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateUserMessages: {
      reducer(state, action) {
        insertMessage(state, action);
      },
      prepare(conversationIdentifier, message) {
        return {
          payload: { conversation: conversationIdentifier, message },
        };
      },
    },
    sendMessageSock: (state, action) => {
      // handled by middleware
    },
  },
  extraReducers: {
    [initialConversationMessage.fulfilled]: (state, action) => {
      state.status = IDLE;
      const conversationIdentifier = action.payload.conversationIdentifier;

      const messages = state.ids.includes(conversationIdentifier)
        ? action.payload.data.results.reverse().concat(
            state.entities[conversationIdentifier].messages
          )
        : action.payload.data.results.reverse();
      messagesAdapter.upsertOne(state, {
        conversationIdentifier,
        messages,
        count: action.payload.data.count,
        next: action.payload.data.next,
        previous: action.payload.data.previous,
      });
    },
    [initialConversationMessage.pending]: (state, action) => {
      state.status = PENDING;
    },
    [initialConversationMessage.rejected]: (state, action) => {
      state.status = REJECTED;
    },
    [sendMessageHttp.fulfilled]: (state, action) => {
      insertMessage(state, action);
    },
    [acceptMessageCharge.fulfilled]: (state, action) => {
      state.acceptChargeStatus = IDLE;

      const conversationIdentifier = action.payload.conversationIdentifier;
      const message = action.payload.data;
      const conversationMessages = messagesAdapter
        .getSelectors()
        .selectById(state, conversationIdentifier);

      chain(conversationMessages.messages)
        .find({ id: message.id })
        .merge(message)
        .value();

      messagesAdapter.updateOne(state, {
        id: conversationIdentifier,
        changes: {
          messages: conversationMessages.messages,
        },
      });
    },
    [acceptMessageCharge.pending]: (state, action) => {
      state.acceptChargeStatus = PENDING;
    },
    [acceptMessageCharge.rejected]: (state, action) => {
      state.acceptChargeStatus = REJECTED;
    },
    [sendMessageHttp.pending]: (state, action) => {},
    [sendMessageHttp.rejected]: (state, action) => {},
  },
});

export const { updateUserMessages, sendMessageSock } = messageSlice.actions;
export const {
  selectAll: selectAllConversationMessages,
  selectById: selectMessagesByConversationIdentifier,
  selectIds: selectConversationIdentifiers,
} = messagesAdapter.getSelectors((state) => state.messages);
export const initialConversationSelector = (state) => state.messages.status;
export default messageSlice.reducer;

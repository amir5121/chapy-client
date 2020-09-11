import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { find, chain, merge } from "lodash";
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
  async (conversationIdentifier) => {
    let res = await chapios.get(`/api/chat/message/${conversationIdentifier}`);
    return {
      conversationIdentifier,
      data: res.data.data,
    };
  },
  {
    condition: (conversationIdentifier, { getState, extra }) => {
      const state = getState();
      if (
        selectConversationIdentifiers(state).includes(conversationIdentifier)
      ) {
        return false;
      }
    },
  }
);
export const acceptMessageCharge = createAsyncThunk(
  "message/accept",
  async (data) => {
    const { conversationIdentifier, messageId } = data;
    let res = await chapios.patch(
      `/api/chat/message/${conversationIdentifier}/${messageId}/`,
      { state: "charged" }
    );
    return {
      conversationIdentifier,
      data: res.data.data,
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
  async (data) => {
    console.log("@@@@@@@@@@@@@", data);
    const { conversationIdentifier } = data;
    data.conversation = conversationIdentifier;
    let res = await chapios.post(
      `/api/chat/message/${conversationIdentifier}/`,
      data
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
  console.log("ooooooooooooooooooo", action);
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
      state.state = IDLE;

      messagesAdapter.upsertOne(state, {
        conversationIdentifier: action.payload.conversationIdentifier,
        messages: action.payload.data.results,
      });
    },
    [initialConversationMessage.pending]: (state, action) => {
      state.state = PENDING;
    },
    [initialConversationMessage.rejected]: (state, action) => {
      state.state = REJECTED;
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

export default messageSlice.reducer;

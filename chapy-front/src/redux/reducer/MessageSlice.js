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
        console.log("ASDASDASDASDASDASD Cannenellll");
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
  },
});

export const { updateUserMessages, sendMessage } = messageSlice.actions;
export const {
  selectAll: selectAllConversationMessages,
  selectById: selectMessagesByConversationIdentifier,
  selectIds: selectConversationIdentifiers,
} = messagesAdapter.getSelectors((state) => state.messages);

export default messageSlice.reducer;

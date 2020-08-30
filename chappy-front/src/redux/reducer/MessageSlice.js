import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter({
  selectId: (instance) => instance.userId,
});

const initialState = messagesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    updateUserMessages: {
      reducer(state, action) {
        const userId = action.payload.userId;
        const message = action.payload.message;
        const userMessages = messagesAdapter
          .getSelectors()
          .selectById(state, userId);
        userMessages
          ? messagesAdapter.updateOne(state, {
              id: userId,
              changes: {
                messages: userMessages.messages.concat(message)
              },
            })
          : messagesAdapter.addOne(state, {
              userId,
              messages: [message],
            });
      },
      prepare(userId, message) {
        return {
          payload: { userId, message },
        };
      },
    },
    sendMessage: (state, action) => {
      // handled by middleware
    },
  },
});

export const { updateUserMessages, sendMessage } = messageSlice.actions;
export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  // Pass in a selector that returns the posts slice of state
} = messagesAdapter.getSelectors((state) => state.messages);

// export const selectUser = createSelector(
//   [selectAllMessages, (state, userId) => userId],
//   (users, userId) => users.find((it) => it.userId === userId)
// );

export default messageSlice.reducer;

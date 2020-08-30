import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const messagesAdapter = createEntityAdapter();

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
        const userIndex = state.users.findIndex((it) => it.userId === userId);
        userIndex > -1
          ? state.users[userIndex].messages.push(message)
          : state.users.push({
              userId: userId,
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
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the posts slice of state
} = messagesAdapter.getSelectors((state) => state.users);

export const selectUser = createSelector(
  [selectAllUsers, (state, userId) => userId],
  (users, userId) => users.find((it) => it.userId === userId)
);

export default messageSlice.reducer;

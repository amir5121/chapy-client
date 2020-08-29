import { createSlice, createSelector,createEntityAdapter } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});
export const chatSlice = createSlice({
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
//
// export const { updateUserMessages, sendMessage } = chatSlice.actions;
//
// export const selectUsers = (state) => state.users;
//
// export const selectUser = createSelector(
//   [selectUsers, (state, userId) => userId],
//   (users, userId) => users.find((it) => it.userId === userId)
// );

export default chatSlice.reducer;

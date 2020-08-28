import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [{ userId: 0, messages: [] }],
  },
  reducers: {
    updateUserMessages: (state, action) => {
      const userId = action.payload.user_id;
      const message = action.payload.message;
      const userIndex = state.users.findIndex((it) => it.userId === userId);
      userIndex > -1
        ? state.users[userIndex].messages.push(message)
        : state.users.push({
            userId: userId,
            messages: [message],
          });
    },
    sendMessage: (state, action) => {
      // handled by middleware
    },
  },
});

export const { updateUserMessages, sendMessage } = chatSlice.actions;

export const selectUsers = (state) => state.chat.users;

export default chatSlice.reducer;

import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: "idle",
  error: null,
});
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  sendMessage: (state, action) => {
    // handled by middleware
  },
});

export const { updateUserMessages, sendMessage } = usersSlice.actions;

export const selectUsers = (state) => state.users;

export const selectUser = createSelector(
  [selectUsers, (state, userId) => userId],
  (users, userId) => users.find((it) => it.userId === userId)
);

export default usersSlice.reducer;

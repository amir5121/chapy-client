import chapios from "../../Chapios";

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

const conversationAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.date.localeCompare(a.date),
  selectId: (instance) => instance.id,
});

const initialState = conversationAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const listConversations = createAsyncThunk(
  "conversations/list",
  async () => {
    const res = await chapios.get("api/conversations/");
    return res.data;
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {},
  extraReducers: {
    [listConversations.fulfilled]: (state, action) => {
      console.log("listConversations.fulfilled", action.payload);
      conversationAdapter.upsertMany(state, action.payload.data);
    },
    [listConversations.pending]: (state, action) => {
      console.log("listConversations.fulfilled", action.payload);
    },
    [listConversations.rejected]: (state, action) => {
      console.log("listConversations.fulfilled", action.payload);
    },
  },
});

// export const {  } = conversationsSlice.actions;
export const {
  selectAll: selectAllConversations,
  selectById: selectConversationById,
  selectIds: selectConversationIds,
  // Pass in a selector that returns the posts slice of state
} = conversationAdapter.getSelectors((state) => state.conversations);

export default conversationsSlice.reducer;

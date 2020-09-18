import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import chapios from "../../utils/Chapios";
import { FULFILLED, IDLE, PENDING, REJECTED } from "../../utils/Constatns";

const transactionAdapter = createEntityAdapter({
  selectId: (instance) => instance.id,
});

const initialState = transactionAdapter.getInitialState({
  status: IDLE,
  error: null,
});

export const listTransactions = createAsyncThunk(
  "transaction/list",
  chapios.get(`/api/accounting/transaction/`),
  {
    condition: (_, { getState, extra }) => {
      const { transaction } = getState();
      if ([FULFILLED, PENDING].includes(transaction.status)) {
        return false;
      }
    },
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: {
    [listTransactions.fulfilled]: (state, action) => {
      state.status = FULFILLED;
      action.payload.data.data &&
        transactionAdapter.upsertMany(state, action.payload.data.data.results);
    },
    [listTransactions.pending]: (state, action) => {
      state.status = PENDING;
    },
    [listTransactions.rejected]: (state, action) => {
      state.status = REJECTED;
    },
  },
});

export const {
  selectAll: selectAllTransactions,
  selectById: selectTransactionById,
  selectIds: selectTransactionIds,
} = transactionAdapter.getSelectors((state) => state.transaction);

export default transactionSlice.reducer;

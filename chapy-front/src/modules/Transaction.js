import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Transactions from "../components/transactions/Transactions";
import {
  listTransactions,
  selectAllTransactions,
} from "../redux/reducer/TransactionSlice";

export default function Transaction() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(listTransactions());
  }, [dispatch]);

  return <Transactions transactions={transactions} />;
}

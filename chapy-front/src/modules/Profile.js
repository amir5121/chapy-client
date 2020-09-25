import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../components/profileForm/ProfileForm";
import { selectMe, updateMe } from "../redux/reducer/MeSlice";
import SideMenu from "../components/sideMenu/SideMenu";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Transactions from "../components/transactions/Transactions";
import {
  listTransactions,
  selectAllTransactions,
} from "../redux/reducer/TransactionSlice";
import { useHistory, useParams } from "react-router-dom";
import { loginUser } from "../redux/reducer/LoginSlice";
import { message } from "antd/es";

export default function Profile() {
  const { selectedTab } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const me = useSelector(selectMe);
  const transactions = useSelector(selectAllTransactions);
  const [selectedItem, setSelectedItem] = useState(selectedTab || "profile");

  const onFinish = (values) => {
    dispatch(updateMe(values)).then((result) => {
      result.type === updateMe.rejected().type &&
        message.error("Something went wrong", 8);
      if (result.type === updateMe.fulfilled().type) {
        message.success("Profile updated", 1);
      }
    });
  };

  useEffect(() => {
    selectedItem === "transactions" && dispatch(listTransactions());
    history.push(`/profile/${selectedItem}/`);
  }, [dispatch, transactions, selectedItem, history]);

  return (
    <Row>
      <Col xs={8} sm={12} md={8} lg={6}>
        <SideMenu menuSelect={setSelectedItem} />
      </Col>
      <Col xs={16} sm={12} md={16} lg={18}>
        {selectedItem === "profile" && (
          <ProfileForm onFinish={onFinish} me={me} />
        )}
        {selectedItem === "transactions" && (
          <Transactions transactions={transactions} me={me} />
        )}
      </Col>
    </Row>
  );
}

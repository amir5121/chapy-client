import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
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

export default function Profile() {
  const { selectedTab } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useSelector(isMobileSelector);
  const me = useSelector(selectMe);
  const transactions = useSelector(selectAllTransactions);
  const [selectedItem, setSelectedItem] = useState(selectedTab || "profile");

  const onFinish = (values) => {
    dispatch(updateMe(values));
  };

  useEffect(() => {
    selectedItem === "transactions" && dispatch(listTransactions());
    history.push(`/profile/${selectedItem}/`);
  }, [dispatch, transactions, selectedItem, history]);

  return (
    <Row>
      <Col span={4}>
        <SideMenu isMobile={isMobile} menuSelect={setSelectedItem} />
      </Col>
      <Col span={20}>
        {selectedItem === "profile" && (
          <ProfileForm onFinish={onFinish} isMobile={isMobile} me={me} />
        )}
        {selectedItem === "transactions" && (
          <Transactions
            transactions={transactions}
            me={me}
            isMobile={isMobile}
          />
        )}
      </Col>
    </Row>
  );
}

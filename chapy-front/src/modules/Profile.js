import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../components/profileForm/ProfileForm";
import { selectMe, syncInstagram, updateMe } from "../redux/reducer/MeSlice";
import SideMenu from "../components/sideMenu/SideMenu";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Transactions from "../components/transactions/Transactions";
import {
  listTransactions,
  selectAllTransactions,
} from "../redux/reducer/TransactionSlice";
import { useHistory, useParams } from "react-router-dom";
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
  const instagramSyncRequest = () => {
    dispatch(syncInstagram()).then((result) => {
      window.open(
        result.payload.data.redirect_url,
        "sharer",
        "toolbar=0,status=0,width=448,height=548"
      );
      console.log(result.payload.data.redirect_url);
    });
  };

  useEffect(() => {
    selectedItem === "transactions" && dispatch(listTransactions());
    history.push(`/profile/${selectedItem}/`);
  }, [dispatch, transactions, selectedItem, history]);

  return (
    <Row>
      <Col xs={8} lg={6}>
        <SideMenu menuSelect={setSelectedItem} selectedItem={selectedItem}/>
      </Col>
      <Col xs={16} lg={18}>
        {selectedItem === "profile" && (
          <ProfileForm
            onFinish={onFinish}
            me={me}
            requestSyncInstagram={instagramSyncRequest}
          />
        )}
        {selectedItem === "transactions" && (
          <Transactions transactions={transactions} me={me} />
        )}
      </Col>
    </Row>
  );
}

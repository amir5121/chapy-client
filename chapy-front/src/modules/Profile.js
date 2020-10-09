import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../components/profileForm/ProfileForm";
import { selectMe, syncInstagram, updateMe } from "../redux/reducer/MeSlice";
import { message } from "antd/es";
import Col from "antd/es/grid/col";
import Row from "antd/es/grid/row";

export default function Profile() {
  const dispatch = useDispatch();
  const me = useSelector(selectMe);

  const onSubmitProfile = (values) => {
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

  return (
    <Row justify="center">
      <Col xs={24} md={18}>
        <ProfileForm
          onFinish={onSubmitProfile}
          me={me}
          requestSyncInstagram={instagramSyncRequest}
        />
      </Col>
    </Row>
  );
}

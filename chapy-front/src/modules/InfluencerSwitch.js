import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { getMe, selectMe, updateMe } from "../redux/reducer/MeSlice";
import Title from "antd/es/typography/Title";
import Card from "antd/es/card";
import { Col } from "antd";
import Row from "antd/es/grid/row";
import Alert from "antd/es/alert";
import Button from "antd/es/button";
import Space from "antd/es/space";
import { Link, useHistory } from "react-router-dom";
import { message } from "antd/es";

export default function InfluencerSwitch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const me = useSelector(selectMe);

  function switchToInfluencer() {
    dispatch(updateMe({ can_charge: true })).then((result) => {
      console.log(result);
      result.type === updateMe.rejected().type &&
        message.error("Something went wrong", 8);
      if (result.type === updateMe.fulfilled().type) {
        message.success("Profile updated", 1);
        dispatch(getMe());
        history.push("/profile/");
      }
    });
  }

  return (
    <Row justify="center" style={{ marginTop: "5vh" }}>
      <Col xs={24} sm={18} md={12}>
        <Card>
          <Title level={3} style={{ textAlign: "center" }}>
            Switch to Influencer account
          </Title>
          <Title level={5}>By switching you will be</Title>
          <ul>
            <li>Identified as an influencer in this platform</li>
            <li>You can charge other for chatting with you.</li>
            <li>
              You won't be able to start conversation and only can respond to
              them.
            </li>
            <li>
              Your profile will become searchable and open be seen on the
              internet.
            </li>
          </ul>
          <Alert message="NOTE: This process is irreversible" type="warning" />
          <br />

          {!Boolean(me.instagram) && (
            <>
              <Alert
                message="You need to sync with instagram first. Head to your profile first"
                type="error"
              />
              <br />
            </>
          )}
          <Space>
            <Button
              onClick={switchToInfluencer}
              disabled={!Boolean(me.instagram)}
            >
              Yes, i'm sure
            </Button>
            <Link to="/profile/">
              <Button danger={Boolean(me.instagram)}>
                {Boolean(me.instagram)
                  ? "No take me back"
                  : "Take me to profile"}
              </Button>
            </Link>
          </Space>
        </Card>
      </Col>
    </Row>
  );
}

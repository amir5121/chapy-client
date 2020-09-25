import React from "react";
import { CheckOutlined } from "@ant-design/icons";

import "./StartConversation.less";
import { Button, Image } from "antd";
import Col from "antd/es/grid/col";

export default function StartConversation(props) {
  const { startConversation, userProfile } = props;

  return (
    <div className="start-conversation-center">
      <Col xs={24} sm={12} md={8} lg={6} className="start-conversation-center">
        <Image width={"100%"} src={userProfile && userProfile.avatar} />
        <h2 style={{ marginTop: "1rem" }}>
          {userProfile && userProfile.full_name}
        </h2>
        <Button
          size="large"
          style={{ background: "limegreen", color: "white" }}
          onClick={startConversation}
          icon={
            <CheckOutlined
              style={{
                color: "white",
              }}
            />
          }
        >
          Start a conversation?
        </Button>
      </Col>
    </div>
  );
}

import React from "react";
import { CheckOutlined } from "@ant-design/icons";

import "./StartConversation.less";
import { Button, Image } from "antd";
import Col from "antd/es/grid/col";
import Title from "antd/es/typography/Title";

export default function StartConversation(props) {
  const { startConversation, userProfile } = props;

  return (
    <div className="start-conversation-center">
      <Image width={"100%"} src={userProfile && userProfile.avatar} />
      <Title style={{ marginTop: "1rem" }}>
        {userProfile && userProfile.full_name}
      </Title>
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
    </div>
  );
}

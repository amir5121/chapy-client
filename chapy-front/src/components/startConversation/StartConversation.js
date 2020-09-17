import React from "react";
import { CheckOutlined } from "@ant-design/icons";

import "./StartConversation.less";
import { Button, Image } from "antd";

export default function StartConversation(props) {
  const { startConversation, isMobile, userProfile } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image width={"50vw"} src={userProfile && userProfile.avatar} />
      <Button
        size="large"
        style={{ background: "limegreen", color: "white", marginTop: "1rem" }}
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

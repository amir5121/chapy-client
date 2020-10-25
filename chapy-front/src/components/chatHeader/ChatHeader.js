import React from "react";

import "./ChatHeader.less";
import { Avatar } from "antd";
import { CONNECTED } from "../../utils/Constatns";
import { Link, useHistory } from "react-router-dom";
import Text from "antd/es/typography/Text";

import { ArrowLeftOutlined, LoadingOutlined } from "@ant-design/icons";

export default function ChatHeader(props) {
  const { socketState, userProfile } = props;
  const history = useHistory();

  return (
    <div className="message-header">
      <ArrowLeftOutlined onClick={() => history.push("/chat/")} />
      <Link to={`/user/${userProfile?.username}`}>
        <Avatar size="large" src={userProfile?.avatar} />
      </Link>
      <Link to={`/user/${userProfile?.username}`}>
        <Text style={{ fontSize: "1.5em" }} strong>
          {userProfile?.full_name}
        </Text>{" "}
        <Text type="secondary">{userProfile?.email}</Text>
      </Link>
      {socketState !== CONNECTED && <LoadingOutlined />}
    </div>
  );
}

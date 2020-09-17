import React from "react";

import "./ChatHeader.less";
import { Button, PageHeader } from "antd";
import { CONNECTED } from "../../utils/Constatns";
import { useHistory } from "react-router-dom";

export default function ChatHeader(props) {
  const { socketState, userProfile } = props;
  const history = useHistory();

  return (
    <PageHeader
      className="message-header"
      onBack={() => history.push("/chat/")}
      title={userProfile && userProfile.full_name}
      subTitle={userProfile && userProfile.email}
      avatar={
        userProfile && {
          src: userProfile.avatar,
        }
      }
      extra={[
        socketState !== CONNECTED && (
          <Button key="loading" type="primary" size="small" loading />
        ),
      ]}
    />
  );
}

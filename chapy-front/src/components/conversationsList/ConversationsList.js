import React from "react";

import "./ConversationsList.less";
import { Avatar, List, Row } from "antd";
import { Link } from "react-router-dom";
import { toPersian } from "../../utils/DateConvertor";
import Text from "antd/es/typography/Text";

const ConversationsList = (props) => {
  const { conversations } = props;
  function get_message(conversation) {
    let lastMessage = conversation.last_message;
    if (!Boolean(lastMessage)) {
      return "No message yet";
    } else if (lastMessage.text) {
      return lastMessage.text.length > 30
        ? lastMessage.text.substr(0, 30) + "..."
        : lastMessage.text;
    } else if (lastMessage.file) {
      return "File";
    }
    return "Ops unhandled";
  }
  return (
    <List
      itemLayout="horizontal"
      dataSource={conversations}
      // header={<span>Conversations</span>}
      renderItem={(item) => (
        <List.Item>
          <Link style={{ width: "100%" }} to={`/chat/${item.user.username}`}>
            <Row align="middle" className="chat-action-row">
              <Avatar size="large" src={item.user.avatar} />
              <div className="conversation-content">
                <p className="title">
                  <span>{item.user.full_name || item.user.username}</span>
                  <span>{toPersian(item.last_message.created)}</span>
                </p>
                <Text
                  type="secondary"
                  strong={
                    !item.last_message.is_read && !item.last_message.is_mine
                  }
                >
                  {get_message(item)}
                </Text>
              </div>
            </Row>
          </Link>
        </List.Item>
      )}
    />
  );
};

export default ConversationsList;

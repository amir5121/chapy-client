import React from "react";

import "./ConversationsList.less";
import { Avatar, Card, Col, List, Row } from "antd";
import { Link } from "react-router-dom";

const ConversationsList = (props) => {
  const { conversations } = props;

  return (
    <Row
      type="flex"
      justify="center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url('/img/tic-tac-toe.svg')",
        backgroundColor: "rgba(223, 219, 229, 0.3)",
      }}
    >
      <Col md={24} lg={20}>
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={conversations}
            // header={<span>Conversations</span>}
            renderItem={(item) => (
              <List.Item>
                <Link
                  style={{ width: "100%" }}
                  to={`/chat/${item.user.username}`}
                >
                  <Row align="middle" className="chat-action-row">
                    <Avatar size="large" src={item.user.avatar} />
                    <div className="conversation-content">
                      <p className="title">
                        <span>{item.user.full_name || item.user.username}</span>
                        <span>{item.modified}</span>
                      </p>
                      <span className="description">
                        {item.last_message.text || "No message yet"}
                      </span>
                    </div>
                  </Row>
                </Link>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ConversationsList;

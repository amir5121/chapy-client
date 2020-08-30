import React, { useEffect } from "react";

import "./Conversations.less";

import { useDispatch, useSelector } from "react-redux";
import {
  listConversations,
  selectAllConversations,
} from "../../redux/reducer/ConversationsSlice";
import { Avatar, Card, Col, List, Row, Space } from "antd";
import { Link } from "react-router-dom";

export default function Conversations() {
  const conversations = useSelector(selectAllConversations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listConversations());
  }, [dispatch]);

  return (
    <Row type="flex" justify="center" style={{ minHeight: "100vh" }}>
      <Col span={20}>
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={conversations}
            header={
              <span>Conversations</span>
            }
            renderItem={(item) => (
              <List.Item>
                <Link style={{ width: "100%" }} to={`/chat/${item.user.email}`}>
                  <Row align="middle" classname='chat-row'>
                    <Avatar
                      size="large"
                      src={
                        item.user.avatar ||
                        `https://api.adorable.io/avatars/285/${item.user.email}`
                      }
                    />
                    <div className='chat-content'>
                      <p className="title">
                        <span>{item.user.full_name}</span>
                        <span>{item.modified}</span>
                      </p>
                      <span className="description">THISISSSS SI I</span>
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
}

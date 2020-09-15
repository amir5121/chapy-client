import React, { useState, useCallback } from "react";
import InfiniteScrollReverse from "react-infinite-scroll-reverse";

import "./Messages.less";
import { Button, Card, Col, Form, Input, PageHeader, Row, Space } from "antd";
import { useHistory } from "react-router-dom";
import { CONNECTED } from "../../utils/Constatns";
import { RedEnvelopeOutlined, SmileOutlined } from "@ant-design/icons";
import Message from "../message/Message";

const { TextArea } = Input;

export default function Messages(props) {
  const {
    socketState,
    conversationMessages,
    sendMessage,
    userProfile,
    onFinishFailed,
    acceptCharge,
    isLoading,
    loadMore,
    isMobile,
  } = props;
  const history = useHistory();
  const [messageForm] = Form.useForm();
  const [hasMessage, setHasMessage] = useState(null);
  const scrollRefCallback = useCallback(
    (chatBottomRef) => {
      chatBottomRef &&
        conversationMessages &&
        chatBottomRef.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
    },
    [conversationMessages]
  );

  return (
    <Card loading={isLoading}>
      <PageHeader
        className="message-header"
        onBack={() => history.push("/chat")}
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
      {conversationMessages ? (
        <div className="chat-container">
          <InfiniteScrollReverse
            className="chat-messages"
            hasMore={conversationMessages.length < 1000}
            loadMore={loadMore}
            isLoading={isLoading}
            loadArea={10}
          >
            {conversationMessages.map((it) => (
              <Message
                key={it.id}
                {...it}
                acceptCharge={() => acceptCharge(it.id)}
              />
            ))}
            <div ref={scrollRefCallback} />
          </InfiniteScrollReverse>
          <Row justify="center">
            <Col span={isMobile ? 24 : 14}>
              <Form
                layout={"inline"}
                name="basic"
                onFinish={sendMessage}
                onFinishFailed={onFinishFailed}
                form={messageForm}
                style={{ display: "flex" }}
                // onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  // label="Message"
                  name="message"
                  wrapperCol={{ sm: 24 }}
                  style={{ flexGrow: 1 }}
                >
                  <TextArea
                    placeholder="Message"
                    onChange={(event) =>
                      setHasMessage(event.target.value.length > 0)
                    }
                    autoSize
                  />
                </Form.Item>

                <Form.Item>
                  {hasMessage ? (
                    <Button type="primary" htmlType="submit">
                      Send
                    </Button>
                  ) : (
                    <Space className="message-action">
                      <RedEnvelopeOutlined />
                      <SmileOutlined />
                    </Space>
                  )}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      ) : (
        <p>Start a conversation?</p>
      )}
    </Card>
  );
}

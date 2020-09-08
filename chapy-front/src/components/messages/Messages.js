import React, { useCallback, useState } from "react";
import "./Messages.less";
import { Button, Card, Col, Form, Input, PageHeader, Row, Space } from "antd";
import { useHistory } from "react-router-dom";
import { CONNECTED } from "../../utils/Constatns";
import { RedEnvelopeOutlined, SmileOutlined } from "@ant-design/icons";
import InfiniteScrollReverse from "react-infinite-scroll-reverse";
import Message from "../message/Message";

const { TextArea } = Input;

export default function Messages(props) {
  const {
    socketState,
    conversationMessages,
    sendMessage,
    userProfile,
    onFinishFailed,
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
    <Card>
      <PageHeader
        style={{ paddingTop: 0 }}
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
      {conversationMessages && (
        <div className="chat-container">
          <InfiniteScrollReverse
            className="chat-messages"
            hasMore={conversationMessages.length < 100}
            isLoading={false}
            loadMore={() => console.log(";paaaa")}
            loadArea={10}
          >
            {conversationMessages &&
              conversationMessages.map((it, index) => (
                <Message
                  key={index}
                  {...it}
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
      )}
    </Card>
  );
}
import React, { useState } from "react";

import "./ChatBox.less";
import { Button, Col, Form, Input, Row, Space } from "antd";
import { RedEnvelopeOutlined, SmileOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function ChatBox(props) {
  const { sendMessage, onFinishFailed, isMobile } = props;
  const [messageForm] = Form.useForm();
  const [hasMessage, setHasMessage] = useState(null);

  return (
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
              onChange={(event) => setHasMessage(event.target.value.length > 0)}
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
  );
}

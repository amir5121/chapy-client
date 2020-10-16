import React, { useState } from "react";

import "./ChatBox.less";
import { Col, Form, Input, Row, Space } from "antd";
import { FileOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
import Uploader from "../Uploader/Uploader";

const { TextArea } = Input;

export default function ChatBox(props) {
  const { sendMessage, onFinishFailed, uploadFile } = props;
  const [messageForm] = Form.useForm();
  const [hasMessage, setHasMessage] = useState(null);

  return (
    <Row justify="center">
      <Col xs={24} sm={18} md={12}>
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
              <SendOutlined
                onClick={() => {
                  messageForm.submit();
                  setTimeout(() => {
                    messageForm.resetFields();
                    setHasMessage(false);
                  }, 100);
                }}
              />
            ) : (
              <Space className="message-action">
                <Uploader uploadFile={uploadFile}>
                  <FileOutlined />
                </Uploader>
                <SmileOutlined />
              </Space>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}

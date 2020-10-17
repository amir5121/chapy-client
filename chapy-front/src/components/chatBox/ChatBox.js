import React, { useEffect, useRef, useState } from "react";

import "./ChatBox.less";
import { Col, Form, Input, Row, Space } from "antd";
import { FileOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
import Uploader from "../Uploader/Uploader";

const { TextArea } = Input;

export default function ChatBox(props) {
  const { sendMessage, onFinishFailed, uploadFile } = props;
  const [messageForm] = Form.useForm();
  const [hasMessage, setHasMessage] = useState(null);
  const textareaRef = useRef(null);
  useEffect(() => {
    const listener = (event) => {
      if (
        !event.shiftKey &&
        (event.code === "Enter" || event.code === "NumpadEnter")
      ) {
        messageForm.submit();
        setTimeout(() => {
          messageForm.resetFields();
          setHasMessage(false);
        }, 100);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [messageForm]);
  // useEffect(() => {
  //   textareaRef.onKeyDown = function (e) {
  //     console.log("aaeaeeeeee", e);
  //     // Enter was pressed without shift key
  //     if (e.code === "Enter" && !e.shiftKey) {
  //       // prevent default behavior
  //       e.preventDefault();
  //     }
  //   };
  // }, []);
  return (
    <Row justify="center">
      <Col xs={24} sm={18} md={16} style={{ maxWidth: "500px" }}>
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
              ref={textareaRef}
              placeholder="Message"
              allowClear
              autoSize
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                }
              }}
              onChange={(event) => setHasMessage(event.target.value.length > 0)}
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

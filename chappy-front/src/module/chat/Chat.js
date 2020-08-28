import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { selectUsers, sendMessage } from "./ChatSlice";
import { connect } from "../socket/SocketSlice";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Chat() {
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect());
  }, [dispatch]);

  const onFinish = (values) => {
    dispatch(sendMessage({ message: values.message }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const messages = users[users.length - 1].messages;

  return (
    <>
      {messages.map((it, index) => (
        <p key={index}>{it}</p>
      ))}
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Message" name="message">
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

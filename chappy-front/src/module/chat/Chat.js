import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  selectMessageById,
  sendMessage,
} from "../../redux/reducer/MessageSlice";
import { connect, socketStatus } from "../../redux/reducer/SocketSlice";
import { CONNECTED } from "../../utils/Constatns";

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
  const { userId } = useParams();

  const user = useSelector((state) => selectMessageById(state, userId));
  const socketState = useSelector(socketStatus);
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
  console.log("oooooooooooooooooo", user, socketState);
  return (
    <>
      {socketState !== CONNECTED && (
        <Button type="primary" size="small" loading />
      )}
      {user &&
        user.messages &&
        user.messages.map((it, index) => <p key={index}>{it}</p>)}
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

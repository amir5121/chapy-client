import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { selectUser, sendMessage } from "../../redux/reducers/UsersSlice";
import { connect } from "../../redux/reducers/SocketSlice";

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

  const user = useSelector(state => selectUser(state, userId));
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

  return (
    <>
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

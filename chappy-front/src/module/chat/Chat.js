import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import {
  initialConversationMessage,
  selectMessagesByConversationIdentifier,
  sendMessage,
} from "../../redux/reducer/MessageSlice";
import { connect, socketStatus } from "../../redux/reducer/SocketSlice";
import { CONNECTED } from "../../utils/Constatns";
import { selectMe } from "../../redux/reducer/AuthSlice";
import {
  getConversations,
  selectConversationIdentifier,
} from "../../redux/reducer/ConversationsSlice";

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
  const conversationIdentifier = useSelector(
    selectConversationIdentifier(userId)
  );
  // const me = useSelector((state) => selectMe(state));
  // const user = useSelector((state) =>
  //   selectMessagesByConversationIdentifier(state, userId)
  // );
  const conversationMessages = useSelector((state) =>
    selectMessagesByConversationIdentifier(state, conversationIdentifier)
  );

  const socketState = useSelector(socketStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect());
    conversationIdentifier
      ? dispatch(initialConversationMessage(conversationIdentifier))
      : dispatch(getConversations(userId));
  }, [dispatch, conversationIdentifier, userId]);

  const onFinish = (values) => {
    dispatch(sendMessage({ message: values.message, user_id: userId }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {socketState !== CONNECTED && (
        <Button type="primary" size="small" loading />
      )}
      {conversationMessages &&
        conversationMessages.messages &&
        conversationMessages.messages.map((it, index) => (
          <p key={index}>{it.text}</p>
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

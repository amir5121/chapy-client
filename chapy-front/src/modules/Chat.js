import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  acceptMessageCharge,
  initialConversationMessage,
  selectMessagesByConversationIdentifier,
  sendMessageHttp,
  sendMessageSock,
} from "../redux/reducer/MessageSlice";
import { connect, socketStatus } from "../redux/reducer/SocketSlice";
import {
  getConversations,
  selectConversationIdentifier,
} from "../redux/reducer/ConversationsSlice";
import Messages from "../components/messages/Messages";
import { getProfile, selectProfileById } from "../redux/reducer/ProfileSlice";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import { sendMessageViaSocket } from "../LocalSetting";

export default function Chat() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);

  const conversationIdentifier = useSelector(
    selectConversationIdentifier(username)
  );

  const conversationMessages = useSelector((state) =>
    selectMessagesByConversationIdentifier(state, conversationIdentifier)
  );

  const socketState = useSelector(socketStatus);

  const userProfile = useSelector((state) =>
    selectProfileById(state, username)
  );

  useEffect(() => {
    dispatch(connect());
    conversationIdentifier
      ? dispatch(initialConversationMessage(conversationIdentifier))
      : dispatch(getConversations(username));
  }, [dispatch, conversationIdentifier, username]);

  useEffect(() => {
    dispatch(getProfile(username));
  }, [dispatch, username]);

  const onFinish = (values) => {
    if (sendMessageViaSocket) {
      dispatch(sendMessageSock({ message: values.message, user_id: username }));
    } else {
      dispatch(
        sendMessageHttp({ text: values.message, conversationIdentifier })
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function acceptCharge(messageId) {
    dispatch(acceptMessageCharge({ messageId, conversationIdentifier }));
  }

  return (
    <Messages
      socketState={socketState}
      conversationMessages={
        conversationMessages && conversationMessages.messages
      }
      sendMessage={onFinish}
      onFinishFailed={onFinishFailed}
      userProfile={userProfile}
      acceptCharge={acceptCharge}
      isMobile={isMobile}
    />
  );
}

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  acceptMessageCharge,
  initialConversationMessage,
  initialConversationSelector,
  selectMessagesByConversationIdentifier,
  sendMessageHttp,
  sendMessageSock,
} from "../redux/reducer/MessageSlice";
import { connect, socketStatus } from "../redux/reducer/SocketSlice";
import {
  createConversation,
  getConversations,
  selectConversationIdentifier,
} from "../redux/reducer/ConversationsSlice";
import Messages from "../components/messages/Messages";
import { getProfile, selectProfileById } from "../redux/reducer/ProfileSlice";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import { sendMessageViaSocket } from "../LocalSetting";
import { PENDING } from "../utils/Constatns";
import ChatBox from "../components/chatBox/ChatBox";
import ChatHeader from "../components/chatHeader/ChatHeader";
import { Card } from "antd";
import StartConversation from "../components/startConversation/StartConversation";
import { isLoggedIn } from "../utils/Authenticate";

export default function Chat() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);
  const history = useHistory();

  const conversationIdentifier = useSelector(
    selectConversationIdentifier(username)
  );

  const conversationMessages = useSelector((state) =>
    selectMessagesByConversationIdentifier(state, conversationIdentifier)
  );

  const socketState = useSelector(socketStatus);
  const isLoading = useSelector(initialConversationSelector) === PENDING;

  const userProfile = useSelector((state) =>
    selectProfileById(state, username)
  );
  function loadMore() {
    conversationIdentifier &&
      !isLoading &&
      console.log(
        "LOAAAAAAAAAAAAAAAMOOOOOOREEEEEEEEEEEE",
        conversationIdentifier,
        !isLoading
      );
    conversationIdentifier &&
      !isLoading &&
      dispatch(initialConversationMessage(conversationIdentifier));
  }
  useEffect(() => {
    if (isLoggedIn()) {
      dispatch(connect());
      conversationIdentifier
        ? dispatch(initialConversationMessage(conversationIdentifier))
        : dispatch(getConversations(username));
    }
  }, [dispatch, conversationIdentifier, username]);

  useEffect(() => {
    console.log("!@#!@#!@#!@#!@#####");
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

  function startConversation() {
    isLoggedIn()
      ? dispatch(createConversation({ user: username })).then(() => {
          dispatch(getConversations(username));
        })
      : history.push("/login/");
  }

  return (
    <Card loading={isLoading}>
      {conversationMessages ? (
        <>
          <ChatHeader socketState={socketState} userProfile={userProfile} />
          <Messages
            conversationMessages={conversationMessages}
            acceptCharge={acceptCharge}
            isMobile={isMobile}
            loadMore={loadMore}
          />
          <ChatBox
            sendMessage={onFinish}
            onFinishFailed={onFinishFailed}
            isMobile={isMobile}
          />
        </>
      ) : (
        <StartConversation
          isMobile={isMobile}
          userProfile={userProfile}
          startConversation={startConversation}
        />
      )}
    </Card>
  );
}

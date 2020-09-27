import React, { useEffect, useState } from "react";
import Skeleton from "antd/es/skeleton";
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
  createConversation,
  getConversations,
  selectConversationIdentifier,
} from "../redux/reducer/ConversationsSlice";
import Messages from "../components/messages/Messages";
import { getProfile, selectProfileById } from "../redux/reducer/ProfileSlice";
import { sendMessageViaSocket } from "../LocalSetting";
import ChatBox from "../components/chatBox/ChatBox";
import ChatHeader from "../components/chatHeader/ChatHeader";
import StartConversation from "../components/startConversation/StartConversation";

export default function Chat() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
  function loadMore() {
    conversationIdentifier &&
      !isLoading &&
      dispatch(initialConversationMessage(conversationIdentifier));
  }
  useEffect(() => {
    dispatch(connect());
    conversationIdentifier
      ? dispatch(initialConversationMessage(conversationIdentifier)).then(() =>
          setIsLoading(false)
        )
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

  function startConversation() {
    dispatch(createConversation({ user: username })).then(() => {
      dispatch(getConversations(username));
    });
  }

  return isLoading ? (
    [...Array(10)].map((value, index) => (
      <Skeleton key={index} loading paragraph={{ rows: 1 }} />
    ))
  ) : (
    <div style={{ backgroundColor: "white" }}>
      {conversationMessages ? (
        <>
          <ChatHeader socketState={socketState} userProfile={userProfile} />
          <div
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url('/img/tic-tac-toe.svg')",
              backgroundColor: "rgba(223, 219, 229, 0.3)",
            }}
          >
            <Messages
              conversationMessages={conversationMessages}
              acceptCharge={acceptCharge}
              loadMore={loadMore}
              loading={isLoading}
            />
            <ChatBox sendMessage={onFinish} onFinishFailed={onFinishFailed} />
          </div>
        </>
      ) : (
        <StartConversation
          userProfile={userProfile}
          startConversation={startConversation}
        />
      )}
    </div>
  );
}

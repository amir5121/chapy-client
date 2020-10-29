import React, { useEffect, useRef, useState } from "react";
import Skeleton from "antd/es/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  acceptMessageCharge,
  initialConversationMessage, readMessageSock,
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
import UserPage from "../components/startConversation/UserPage";
import { filePut } from "../redux/reducer/FileSlice";
import Modal from "antd/es/modal";
import { Image, Input } from "antd";
import { httpBaseUrl } from "../Setting";
import { selectMe } from "../redux/reducer/MeSlice";

export default function Chat(props) {
  const { justUserPage } = props;
  const { username } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [cost, setCost] = useState(null);
  const [modalContent, setModalContent] = useState({
    visible: false,
    file: null,
  });
  const messagesRef = useRef(null);
  const conversationIdentifier = useSelector(
    selectConversationIdentifier(username)
  );
  const me = useSelector(selectMe);

  const conversationMessages = useSelector((state) =>
    selectMessagesByConversationIdentifier(state, conversationIdentifier)
  );

  const socketState = useSelector(socketStatus);
  const userProfile = useSelector((state) =>
    selectProfileById(state, username)
  );

  // useEffect(() => {
  //   setTimeout(() => messagesRef.current?.scrollToBottom(), 100);
  // }, [conversationMessages]);

  function loadMore() {
    conversationIdentifier &&
      !isLoading &&
      dispatch(initialConversationMessage(conversationIdentifier));
  }

  useEffect(() => {
    conversationIdentifier
      ? dispatch(initialConversationMessage(conversationIdentifier)).then(
          () => {
            setIsLoading(false);
            dispatch(connect());
          }
        )
      : dispatch(getConversations(username)).then((result) => {
          result.type === getConversations.fulfilled().type &&
            dispatch(connect());
          result.type === getConversations.rejected().type &&
            setIsLoading(false);
        });
  }, [dispatch, conversationIdentifier, username]);

  useEffect(() => {
    dispatch(getProfile(username));
  }, [dispatch, username]);

  const sendMessage = (values) => {
    if (sendMessageViaSocket) {
      dispatch(
        sendMessageSock({
          message: values.message,
          user_id: username,
          file: values.file,
          cost: values.cost,
        })
      );
      setTimeout(() => messagesRef.current.scrollToBottom(), 600);
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

  function markAsRead(messageId) {
    dispatch(readMessageSock({ messageId, conversationIdentifier }));
  }

  function startConversation() {
    dispatch(createConversation({ user: username })).then(() => {
      dispatch(getConversations(username));
    });
  }

  function modalOk(file) {
    console.log("!@!@!@#####@@@", { file, modalContent });
    sendMessage({
      file: modalContent.file,
      cost: Number(cost),
      user_id: username,
    });
    setModalContent({ ...modalContent, visible: false });
  }

  function modalClose(file) {
    setModalContent({ ...modalContent, visible: false });
  }

  function uploadFile(file) {
    dispatch(filePut(file)).then((result) => {
      console.log("upload complete", result, file);
      setModalContent({
        ...modalContent,
        visible: true,
        file: result.payload.data.file_path,
      });
    });
    console.log("evvent", file);
  }

  return isLoading ? (
    [...Array(10)].map((value, index) => (
      <Skeleton key={index} loading paragraph={{ rows: 1 }} />
    ))
  ) : (
    <div style={{ backgroundColor: "white" }}>
      {conversationMessages && !justUserPage ? (
        <>
          <ChatHeader socketState={socketState} userProfile={userProfile} />
          <div
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url('/img/tic-tac-toe.svg')",
              backgroundColor: "rgba(223, 219, 229, 0.3)",
            }}
          >
            <Modal
              visible={modalContent.visible}
              onOk={modalOk}
              onCancel={modalClose}
              title="Send file?"
              okText="Send"
              cancelText="Cancel"
            >
              <Image
                src={httpBaseUrl + modalContent.file}
                style={{ margin: "1em" }}
              />
              <Input
                placeholder="Cost"
                type="number"
                onChange={(e) => setCost(e.target.value)}
              />
            </Modal>
            <Messages
              ref={messagesRef}
              conversationMessages={conversationMessages}
              acceptCharge={acceptCharge}
              markAsRead={markAsRead}
              loadMore={loadMore}
              loading={isLoading}
            />
            <ChatBox
              sendMessage={(values) => {
                values.message && sendMessage(values);
              }}
              onFinishFailed={onFinishFailed}
              uploadFile={uploadFile}
              costPerCharacter={me.cost_per_character}
            />
          </div>
        </>
      ) : (
        <UserPage
          userProfile={userProfile}
          startConversation={startConversation}
        />
      )}
    </div>
  );
}

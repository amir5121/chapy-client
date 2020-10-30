import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  selectAllConversations,
} from "../redux/reducer/ConversationsSlice";
import ConversationsList from "../components/conversationsList/ConversationsList";
import {
  getWebConfigurations,
  initialConfig,
} from "../redux/reducer/ConfigSlice";
import SuggestedUsers from "../components/suggestedUsers/SuggestedUsers";
import { useTranslation } from "react-i18next";
import { Card, Col, Row } from "antd";

export default function Conversations(props) {
  const { isInChatMode } = props;
  const conversations = useSelector(selectAllConversations);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const configs = useSelector(getWebConfigurations);

  useEffect(() => {
    dispatch(initialConfig());
    dispatch(getConversations());
  }, [dispatch]);

  function renderConversationList(conversationsList) {
    return isInChatMode ? (
      <div style={{ flexGrow: 1 }}>{conversationsList}</div>
    ) : (
      <Row
        type="flex"
        justify="center"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),url('/img/tic-tac-toe.svg')",
          backgroundColor: "rgba(223, 219, 229, 0.3)",
        }}
      >
        <Col xs={24} md={20} lg={18}>
          <Card>{conversationsList} </Card>
        </Col>
      </Row>
    );
  }
  return conversations.length > 0 ? (
    renderConversationList(<ConversationsList conversations={conversations} />)
  ) : (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ paddingTop: "1rem" }}>
        No conversations yet! start a new one
      </h2>
      <p>{t("userSuggestion")}</p>
      {configs && <SuggestedUsers users={configs.top_users} />}
    </div>
  );
}

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  selectAllConversations,
} from "../redux/reducer/ConversationsSlice";
import ConversationsList from "../components/conversationsList/ConversationsList";
import {
  getConfigs,
  initialConfig,
  isMobileSelector,
} from "../redux/reducer/ConfigSlice";
import SuggestedUsers from "../components/suggestedUsers/SuggestedUsers";

export default function Conversations() {
  const conversations = useSelector(selectAllConversations);
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);

  const configs = useSelector(getConfigs);

  useEffect(() => {
    dispatch(initialConfig());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  return conversations.length > 0 ? (
    <ConversationsList conversations={conversations} isMobile={isMobile} />
  ) : (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ paddingTop: "1rem" }}>
        No conversations yet! start a new one
      </h2>
      <p>Here is some suggestion</p>
      {configs && (
        <SuggestedUsers isMobile={isMobile} users={configs.top_users} />
      )}
    </div>
  );
}

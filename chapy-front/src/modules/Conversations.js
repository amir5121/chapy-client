import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  selectAllConversations,
} from "../redux/reducer/ConversationsSlice";
import ConversationsList from "../components/conversationsList/ConversationsList";
import { getConfigs, initialConfig } from "../redux/reducer/ConfigSlice";
import SuggestedUsers from "../components/suggestedUsers/SuggestedUsers";
import { registerForNotification } from "../utils/NotificationHelpers";
import { registerBrowser } from "../redux/reducer/NotificationSlice";

export default function Conversations() {
  const conversations = useSelector(selectAllConversations);
  const dispatch = useDispatch();

  const configs = useSelector(getConfigs);

  useEffect(() => {
    dispatch(initialConfig());
    dispatch(getConversations());

    registerForNotification(dispatch, registerBrowser)
  }, [dispatch]);

  return conversations.length > 0 ? (
    <ConversationsList conversations={conversations} />
  ) : (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ paddingTop: "1rem" }}>
        No conversations yet! start a new one
      </h2>
      <p>Here is some suggestion</p>
      {configs && <SuggestedUsers users={configs.top_users} />}
    </div>
  );
}

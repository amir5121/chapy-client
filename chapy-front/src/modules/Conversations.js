import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getConversations,
  selectAllConversations,
} from "../redux/reducer/ConversationsSlice";
import ConversationsList from "../components/conversationsList/ConversationsList";
import {isMobileSelector} from "../redux/reducer/ConfigSlice";

export default function Conversations() {
  const conversations = useSelector(selectAllConversations);
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  return <ConversationsList conversations={conversations} isMobile={isMobile} />;
}

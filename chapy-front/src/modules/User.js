import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPage from "../components/startConversation/UserPage";
import { getProfile, selectProfileById } from "../redux/reducer/ProfileSlice";
import { useHistory, useParams } from "react-router-dom";
import { createConversation } from "../redux/reducer/ConversationsSlice";

export default function User() {
  const { username } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const userProfile = useSelector((state) =>
    selectProfileById(state, username)
  );

  function startConversation() {
    dispatch(createConversation({ user: username })).then(() => {
      history.push(`/chat/${username}`);
    });
  }

  useEffect(() => {
    dispatch(getProfile(username));
  }, [dispatch, username]);

  return (
    <UserPage userProfile={userProfile} startConversation={startConversation} />
  );
}

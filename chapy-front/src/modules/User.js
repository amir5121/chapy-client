import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPage from "../components/startConversation/UserPage";
import { getProfile, selectProfileById } from "../redux/reducer/ProfileSlice";
import { useParams } from "react-router-dom";

export default function User() {
  const { username } = useParams();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) =>
    selectProfileById(state, username)
  );

  useEffect(() => {
    dispatch(getProfile(username));
  }, [dispatch, username]);

  return <UserPage userProfile={userProfile} />;
}

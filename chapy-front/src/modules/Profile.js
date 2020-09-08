import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import ProfileForm from "../components/profileForm/ProfileForm";
import {selectMe, updateMe} from "../redux/reducer/MeSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);
  const me = useSelector(selectMe);

  const onFinish = (values) => {
    dispatch(updateMe(values))
  };

  return <ProfileForm onFinish={onFinish} isMobile={isMobile} me={me} />;
}

import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/reducer/LoginSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/Authenticate";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import {getMe} from "../redux/reducer/MeSlice";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMobile = useSelector(isMobileSelector);

  const onFinish = (values) => {
    dispatch(loginUser(values))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log("originalPromiseResult", originalPromiseResult);
        isLoggedIn() && history.push("/chat/");
        dispatch(getMe());
      })
      .catch((serializedError) => {
        console.log("serializedError", serializedError);
      });
  };

  isLoggedIn() && history.push("/chat/");

  return <LoginForm onFinish={onFinish} isMobile={isMobile} />;
}

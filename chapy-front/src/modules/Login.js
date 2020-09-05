import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/reducer/LoginSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/Authenticate";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(loginUser(values))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log("originalPromiseResult", originalPromiseResult);
        isLoggedIn() && history.push("/chat/");
      })
      .catch((serializedError) => {
        console.log("serializedError", serializedError);
      });
  };

  isLoggedIn() && history.push("/chat/");

  return <LoginForm onFinish={onFinish} />;
}

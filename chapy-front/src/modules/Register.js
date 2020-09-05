import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../redux/reducer/RegisterSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/Authenticate";
import RegisterForm from "../components/registerForm/RegisterForm";

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(registerUser(values))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log("originalPromiseResult", originalPromiseResult);
        isLoggedIn() && history.push("/login/");
      })
      .catch((serializedError) => {
        console.log("serializedError", serializedError);
      });
  };

  isLoggedIn() && history.push("/chat/");

  return <RegisterForm onFinish={onFinish} />;
}

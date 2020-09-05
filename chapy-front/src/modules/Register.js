import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../redux/reducer/RegisterSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { isLoggedIn } from "../utils/Authenticate";
import RegisterForm from "../components/registerForm/RegisterForm";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";

export default function Register() {
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);
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

  return <RegisterForm onFinish={onFinish} isMobile={isMobile} />;
}

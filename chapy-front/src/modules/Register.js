import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  registerUser,
  selectRegisterError,
  selectRegisterState,
} from "../redux/reducer/RegisterSlice";
import { isLoggedIn } from "../utils/Authenticate";
import RegisterForm from "../components/registerForm/RegisterForm";
import { isMobileSelector } from "../redux/reducer/ConfigSlice";
import { message } from "antd/es";
import { PENDING } from "../utils/Constatns";

export default function Register() {
  const dispatch = useDispatch();
  const isMobile = useSelector(isMobileSelector);
  const isLoading = useSelector(selectRegisterState);
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(registerUser(values)).then((result) => {
      console.log("@!#!@#!23", {result})
      result.type === registerUser.rejected().type &&
        message.error(result.payload.message, 10);
      result.type === registerUser.fulfilled().type && history.push("/login/");
    });
  };

  isLoggedIn() && history.push("/chat/");

  return (
    <RegisterForm
      onFinish={onFinish}
      isMobile={isMobile}
      isLoading={isLoading === PENDING}
    />
  );
}

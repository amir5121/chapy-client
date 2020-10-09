import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser, selectRegisterState } from "../redux/reducer/AuthSlice";
import { isLoggedIn } from "../utils/Authenticate";
import RegisterForm from "../components/registerForm/RegisterForm";
import { message } from "antd/es";
import { PENDING } from "../utils/Constatns";

export default function Register() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectRegisterState);
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(registerUser(values)).then((result) => {
      console.log("registerrrrr", result);
      result.type === registerUser.rejected().type &&
        message.error(result.payload.message, 10);
      if (result.type === registerUser.fulfilled().type) {
        message.success("Register success. Now you can login", 8);
        history.push("/login/");
      }
    });
  };

  isLoggedIn() && history.push("/chat/");

  return <RegisterForm onFinish={onFinish} isLoading={isLoading === PENDING} />;
}

import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/reducer/AuthSlice";
import { isLoggedIn } from "../utils/Authenticate";
import { message } from "antd/es";
import { getMe } from "../redux/reducer/MeSlice";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(loginUser(values)).then((result) => {
      result.type === loginUser.rejected().type &&
        message.error("Wrong Username or password", 8);
      if (result.type === loginUser.fulfilled().type) {
        dispatch(getMe());
        history.push("/chat/");
      }
    });
  };

  isLoggedIn() && history.push("/chat/");

  return <LoginForm onFinish={onFinish} />;
}

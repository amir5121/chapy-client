import React from "react";
import LoginForm from "../components/loginForm/LoginForm";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../redux/reducer/AuthSlice";
import { isLoggedIn } from "../utils/Authenticate";
import { message } from "antd/es";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = (values) => {
    dispatch(loginUser(values)).then((result) => {
      result.type === loginUser.rejected().type &&
        message.error("Wrong Username or password", 8);
      if (result.type === loginUser.fulfilled().type) {
        history.push("/chat/");
      }
    });
    // .then(unwrapResult)
    // .then((originalPromiseResult) => {
    //   console.log("originalPromiseResult", originalPromiseResult);
    //   isLoggedIn() && history.push("/chat/");
    //   dispatch(getMe());
    // })
    // .catch((serializedError) => {
    //   console.log("serializedError", serializedError);
    // });
  };

  isLoggedIn() && history.push("/chat/");

  return <LoginForm onFinish={onFinish} />;
}

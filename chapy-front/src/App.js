import React from "react";
import "antd/dist/antd.css";
import "antd/dist/antd.less";
import { Provider } from "react-redux";
import store from "./redux/Store";
import Routes from "./router/Routes";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

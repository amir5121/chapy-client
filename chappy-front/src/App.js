import React from "react";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import Routes from "./router/Routes";
import "./App.less";

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

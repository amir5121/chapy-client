import React from "react";
import "./App.less";
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

import React, { Suspense } from "react";
import "./App.less";
import { Provider } from "react-redux";
import store from "./redux/Store";
import Routes from "./router/Routes";

export default function App() {
  return (
    <Suspense fallback={null}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </Suspense>
  );
}

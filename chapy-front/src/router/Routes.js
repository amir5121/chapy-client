import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { throttle } from "lodash";
import { useDispatch } from "react-redux";
import { ConfigProvider, Layout } from "antd";
import Chat from "../modules/Chat";
import Home from "../modules/Home";
import PrivateRoute from "./PrivateRoute";
import Login from "../modules/Login";
import Conversations from "../modules/Conversations";
import ChapyFooter from "../components/footer/ChapyFooter";
import Register from "../modules/Register";
import Header from "../modules/Header";
import Profile from "../modules/Profile";
import { viewportUpdated } from "../redux/reducer/ConfigSlice";
import { getMe } from "../redux/reducer/MeSlice";

const { Content } = Layout;

const Routes = () => {
  const dispatch = useDispatch();

  const throttledSetViewPortWidth = throttle(
    () => window && dispatch(viewportUpdated(window.innerWidth)),
    1000
  );
  useEffect(() => {
    dispatch(getMe());
    if (window) {
      window.addEventListener("resize", throttledSetViewPortWidth);
      dispatch(viewportUpdated(window.innerWidth));
    }

    return () =>
      window && window.removeEventListener("resize", throttledSetViewPortWidth);
  }, [dispatch, throttledSetViewPortWidth]);
  return (
    <ConfigProvider direction="rtl">
      <Router>
        <Layout>
          <Header />
          <Content style={{ padding: "0 2vw" }}>
            <Layout style={{ padding: "5vh 0" }}>
              <Content style={{ padding: "0 2vw", minHeight: "50vh" }}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <PrivateRoute path="/chat/:username" component={Chat} />
                  <PrivateRoute path="/chat" component={Conversations} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <Route path="/" component={Home} />
                </Switch>
              </Content>
            </Layout>
          </Content>
          <ChapyFooter />
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default Routes;
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
import { isLoggedIn } from "../utils/Authenticate";
import { loadVersionBrowser } from "../utils/NotificationHelpers";
import {
  getRegistrationId,
  registerBrowser,
} from "../redux/reducer/NotificationSlice";
import { objectValues } from "../utils/JavascriptHelpers";
import InstagramAuthorize from "../modules/InstagramAuthorize";
import InfluencerSwitch from "../modules/InfluencerSwitch";
import Transaction from "../modules/Transaction";
import User from "../modules/User";

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
    isLoggedIn() &&
      dispatch(getRegistrationId()).then((action) => {
        const browser = loadVersionBrowser(navigator.userAgent);
        dispatch(
          registerBrowser({
            browser: browser.name.toUpperCase(),
            name: objectValues(browser).join(" "),
            cloud_message_type: "FCM",
            registration_id: action.payload,
          })
        );
      });

    return () =>
      window && window.removeEventListener("resize", throttledSetViewPortWidth);
  }, [dispatch, throttledSetViewPortWidth]);

  return (
    <ConfigProvider direction="ltr">
      <Router>
        <Layout>
          <Header />
          <Content>
            <Layout>
              <Content style={{ minHeight: "50vh" }}>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <PrivateRoute path="/chat/:username" component={Chat} />
                  <PrivateRoute path="/user/:username" component={User} />
                  <PrivateRoute path="/chat" component={Conversations} />
                  <PrivateRoute
                    path="/to-influencer"
                    component={InfluencerSwitch}
                  />
                  <PrivateRoute
                    path="/authorize-instagram"
                    component={InstagramAuthorize}
                  />
                  <PrivateRoute path="/transactions" component={Transaction} />
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

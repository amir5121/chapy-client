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
import {
  getNotificationOptions,
  getTitle,
  loadVersionBrowser,
  urlBase64ToUint8Array,
} from "../utils/NotificationHelpers";
import { applicationServerKey } from "../LocalSetting";

const { Content } = Layout;

const Routes = () => {
  const dispatch = useDispatch();

  const throttledSetViewPortWidth = throttle(
    () => window && dispatch(viewportUpdated(window.innerWidth)),
    1000
  );
  useEffect(() => {
    dispatch(getMe());
    console.log("!@#################-----------------");
    if (window) {
      window.addEventListener("resize", throttledSetViewPortWidth);
      dispatch(viewportUpdated(window.innerWidth));
      // In your ready listener
      if ("serviceWorker" in navigator) {
        // The service worker has to store in the root of the app
        // http://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready
        const browser = loadVersionBrowser(navigator.userAgent);
        console.log(
          "!@######################",
          browser,
          navigator.serviceWorker
        );
        navigator.serviceWorker
          .register("/serviceWorker.js")
          .then(function (reg) {
            reg.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  applicationServerKey
                ),
              })
              .then(function (sub) {
                const endpointParts = sub.endpoint.split("/");
                const registration_id = endpointParts[endpointParts.length - 1];
                const data = {
                  browser: browser.name.toUpperCase(),
                  p256dh: btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(sub.getKey("p256dh"))
                    )
                  ),
                  auth: btoa(
                    String.fromCharCode.apply(
                      null,
                      new Uint8Array(sub.getKey("auth"))
                    )
                  ),
                  name: "XXXXX",
                  registration_id: registration_id,
                };
                console.log("--------requestPOSTToServer", data);
                // requestPOSTToServer(data);
              });
          })
          .catch(function (err) {
            console.log(":^(", err);
          });
      }
    }

    return () =>
      window && window.removeEventListener("resize", throttledSetViewPortWidth);
  }, [dispatch, throttledSetViewPortWidth]);

  const reload = () => window.location.reload();

  return (
    <ConfigProvider direction="rtl">
      <Router>
        <Layout>
          <Header />
          <Content>
            <Layout>
              <Content style={{ minHeight: "50vh" }}>
                <Switch>
                  <Route path="/serviceWorker.js" onEnter={reload} />
                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <PrivateRoute path="/chat/:username" component={Chat} />
                  <PrivateRoute path="/chat" component={Conversations} />
                  <PrivateRoute
                    path="/profile/:selectedTab?"
                    component={Profile}
                  />
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

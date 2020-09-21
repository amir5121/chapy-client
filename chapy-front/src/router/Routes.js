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
    console.log("!@#################-----------------")
    if (window) {
      window.addEventListener("resize", throttledSetViewPortWidth);
      dispatch(viewportUpdated(window.innerWidth));
      // In your ready listener
      if ("serviceWorker" in navigator) {
        // The service worker has to store in the root of the app
        // http://stackoverflow.com/questions/29874068/navigator-serviceworker-is-never-ready
        const browser = loadVersionBrowser(navigator.userAgent);
        console.log("!@######################", browser, navigator.serviceWorker);
        navigator.serviceWorker
          .register("navigatorPush.service.js?version=1.0.0")
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
      console.log("@98797987987987987987987987987#")
      window.addEventListener("install", function (event) {
        console.log("ASDASDASD skiiiiiiiiiip waiting", event);
        window.skipWaiting();
      });

      window.addEventListener("push", function (event) {
        console.log("ASDASDASD puuuuuuuuuuuuuuuuuuuuuuuuuushhhh");

        let title = "";
        let message = event.data.text();
        let message_tag = "";
        try {
          // Push is a JSON
          let response_json = event.data.json();
          title = response_json.title;
          message = response_json.message;
          message_tag = response_json.tag;
        } catch (err) {
          // Push is a simple text
        }
        window.registration.showNotification(
          getTitle(title),
          getNotificationOptions(message, message_tag)
        );
        // // Optional: Comunicating with our js application. Send a signal
        // self.clients
        //   .matchAll({ includeUncontrolled: true, type: "window" })
        //   .then(function (clients) {
        //     clients.forEach(function (client) {
        //       client.postMessage({
        //         data: message_tag,
        //         data_title: title,
        //         data_body: message,
        //       });
        //     });
        //   });
      });

      // // Optional: Added to that the browser opens when you click on the notification push web.
      // self.addEventListener("notificationclick", function (event) {
      //   // Android doesn't close the notification when you click it
      //   // See http://crbug.com/463146
      //   event.notification.close();
      //   // Check if there's already a tab open with this URL.
      //   // If yes: focus on the tab.
      //   // If no: open a tab with the URL.
      //   event.waitUntil(
      //     clients
      //       .matchAll({ type: "window", includeUncontrolled: true })
      //       .then(function (windowClients) {
      //         for (var i = 0; i < windowClients.length; i++) {
      //           var client = windowClients[i];
      //           if ("focus" in client) {
      //             return client.focus();
      //           }
      //         }
      //       })
      //   );
      // });
    }

    return () =>
      window && window.removeEventListener("resize", throttledSetViewPortWidth);
  }, [dispatch, throttledSetViewPortWidth]);
  return (
    <ConfigProvider direction="rtl">
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

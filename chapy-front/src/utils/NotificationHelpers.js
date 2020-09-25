import { objectValues } from "./JavascriptHelpers";
import firebase from "firebase/app";
import "firebase/messaging";
import { FIREBASE_CONFIG } from "./Constatns";

export function loadVersionBrowser(userAgent) {
  let ua = userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: "IE", version: tem[1] || "" };
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem != null) {
      return { name: "Opera", version: tem[1] };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1],
  };
}

export function registerForNotification(dispatch, registerBrowser) {
  firebase.initializeApp(FIREBASE_CONFIG);

  const messaging = firebase.messaging();
  messaging
    .getToken()
    .then((registration_id) => {
      const browser = loadVersionBrowser(navigator.userAgent);
      console.log("WEWEWEWEWEW", registration_id);
      const data = {
        browser: browser.name.toUpperCase(),
        // p256dh: btoa(
        //   String.fromCharCode.apply(
        //     null,
        //     new Uint8Array(sub.getKey("p256dh"))
        //   )
        // ),
        // auth: btoa(
        //   String.fromCharCode.apply(
        //     null,
        //     new Uint8Array(sub.getKey("auth"))
        //   )
        // ),
        name: objectValues(browser).join(" "),
        cloud_message_type: "FCM",
        registration_id: registration_id,
      };
      dispatch(registerBrowser(data));
      console.log("--------requestPOSTToServer", data);
    })
    .catch((err) => {
      console.log("service worker failed", err);
    });

  messaging.onMessage((payload) => {
    console.log("ASDASDASDASD------------", payload);
  });
}

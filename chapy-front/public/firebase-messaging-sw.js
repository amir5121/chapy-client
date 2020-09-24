// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyB8HUkOxeVT_aAhaHjP2ZEFHMjhcogozXs",
  authDomain: "chapy-7a54c.firebaseapp.com",
  databaseURL: "https://chapy-7a54c.firebaseio.com",
  projectId: "chapy-7a54c",
  storageBucket: "chapy-7a54c.appspot.com",
  messagingSenderId: "843269814169",
  appId: "1:843269814169:web:a720f6015de26136ee0508",
  measurementId: "G-Z9WF6HLW08",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

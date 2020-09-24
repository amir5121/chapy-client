const getTitle = function (title) {
  if (title === "") {
    title = "TITLE DEFAULT";
  }
  return title;
};
const getNotificationOptions = function (message, message_tag) {
  return {
    body: message,
    icon: "/img/icon_120.png",
    tag: message_tag,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };
};

if (typeof window !== "undefined") {
  window.addEventListener("install", function (event) {
    window.skipWaiting();
  });
  window.addEventListener("push", function (event) {
    console.log("!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@#")
    let title = "";
    let message = event.data.text();
    let message_tag = "";
    try {
      // Push is a JSON
      const response_json = event.data.json();
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
    // Optional: Comunicating with our js application. Send a signal
    window.clients
      .matchAll({ includeUncontrolled: true, type: "window" })
      .then(function (clients) {
        clients.forEach(function (client) {
          client.postMessage({
            data: message_tag,
            data_title: title,
            data_body: message,
          });
        });
      });
  });

  // Optional: Added to that the browser opens when you click on the notification push web.
  window.addEventListener("notificationclick", function (event) {
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(
      window.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then(function (windowClients) {
          for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            if ("focus" in client) {
              return client.focus();
            }
          }
        })
    );
  });
}

import {
  connect,
  connected,
  connecting,
  disconnect,
  disconnected,
} from "./reducer/SocketSlice";

import { updateUserMessages } from "./reducer/MessageSlice";
import { getAuthToken, isLoggedIn } from "../utils/Authenticate";
import { sockBaseUrl } from "../Setting";

const ENDPOINT = sockBaseUrl;

const socketMiddleware = () => {
  let socket = null;
  let pingIntervalId = null;
  let retries = 0;
  console.log(connect);
  const onOpen = (store) => (event) => {
    console.log("websocket open", event.target.url);
    sendMessage(socket, {}, true, "AUTHENTICATE")
      .then(() => {
        store.dispatch(connected(event.target.url));
        pingIntervalId = setInterval(ping, 15000);
      })
      .catch(() => {
        store.dispatch(disconnect());
      });
  };

  const onClose = (store) => () => {
    socket = null;

    clearInterval(pingIntervalId);
    store.dispatch(disconnect());
    if (retries < 10)
      setTimeout(() => store.dispatch(connect()), retries * 1000);
    retries += 1;
    console.log("----------------------", retries);
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    // console.log("receiving server message", payload);

    switch (payload.type) {
      case "NEW_MESSAGE":
        store.dispatch(
          updateUserMessages(
            payload.message.conversation_identifier,
            payload.message.message
          )
        );
        break;
      case "PONG":
        console.log("@!#!@#!@#!@# POOOONNNGGGG");
        break;
      default:
        break;
    }
  };
  const sendMessage = async (
    socket,
    data,
    authenticate = false,
    command = "NEW_MESSAGE"
  ) => {
    await socket.send(
      JSON.stringify({
        ...(authenticate &&
          isLoggedIn() && { authorization: `Token ${getAuthToken()}` }),
        command,
        data,
      })
    );
  };
  const ping = () => {
    sendMessage(socket, {}, false, "PING");
  };

  // the middleware part of this function
  return (store) => (next) => (action) => {
    switch (action.type) {
      case "socket/connect":
        if (socket !== null) {
          break;
        }

        // connect to the remote host
        socket = new WebSocket(ENDPOINT);
        store.dispatch(connecting());

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case "socket/disconnect":
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log("websocket closed", action);
        store.dispatch(disconnected());
        break;
      case "messages/sendMessageSock":
        console.log("sending a message", action.payload);
        sendMessage(socket, action.payload);
        break;
      default:
        // console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware();

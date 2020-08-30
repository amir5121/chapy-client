import {
  connect,
  connected,
  connecting,
  disconnect,
  disconnected,
} from "../reducer/SocketSlice";

import { updateUserMessages } from "../reducer/MessageSlice";
import { getAuthToken } from "../../utils/Authenticate";

const ENDPOINT = "ws://127.0.0.1:8000/ws/chat/";

const socketMiddleware = () => {
  let socket = null;
  console.log(connect);
  const onOpen = (store) => (event) => {
    console.log("websocket open", event.target.url);
    sendMessage(socket, {}, true, "AUTHENTICATE")
      .then(() => {
        store.dispatch(connected(event.target.url));
      })
      .catch(() => {
        store.dispatch(disconnect());
      });
  };

  const onClose = (store) => () => {
    socket = null;
    store.dispatch(disconnect());
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    console.log("receiving server message", payload);
    store.dispatch(updateUserMessages(payload.user_id, payload.message));

    switch (payload.type) {
      case "NEW_MESSAGE":
        // store.dispatch(updateUserMessages(payload));
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
        ...(authenticate && { authorization: `Token ${getAuthToken()}` }),
        command,
        data,
      })
    );
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
        console.log("websocket closed");
        store.dispatch(disconnected());
        break;
      case "messages/sendMessage":
        console.log("sending a message", action.payload);
        sendMessage(socket, action.payload).then().catch();
        break;
      default:
        console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware();

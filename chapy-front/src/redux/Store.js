import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import conversationsReducer from "./reducer/ConversationsSlice";
import registerReducer from "./reducer/RegisterSlice";
import loginReducer from "./reducer/LoginSlice";
import meReducer from "./reducer/MeSlice";
import messageReducer from "./reducer/MessageSlice";
import socketReducer from "./reducer/SocketSlice";
import profileReducer from "./reducer/ProfileSlice";
import configReducer from "./reducer/ConfigSlice";
import socketMiddleware from "./SocketMiddleware";

//https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
const middleware = [...getDefaultMiddleware(), socketMiddleware];
const reducer = {
  conversations: conversationsReducer,
  register: registerReducer,
  auth: loginReducer,
  me: meReducer,
  messages: messageReducer,
  socket: socketReducer,
  profiles: profileReducer,
  config: configReducer,
};

const store = configureStore({ reducer, middleware });

export default store;
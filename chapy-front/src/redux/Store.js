import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import conversationsReducer from "./reducer/ConversationsSlice";
import authReducer from "./reducer/AuthSlice";
import meReducer from "./reducer/MeSlice";
import transactionReducer from "./reducer/TransactionSlice";
import messageReducer from "./reducer/MessageSlice";
import socketReducer from "./reducer/SocketSlice";
import profileReducer from "./reducer/ProfileSlice";
import configReducer from "./reducer/ConfigSlice";
import fileReducer from "./reducer/FileSlice";
import notificationReducer from "./reducer/NotificationSlice";
import socketMiddleware from "./SocketMiddleware";
import asyncDispatchMiddleware from "./AsyncDispatchMiddleware";

//https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
const middleware = [
  ...getDefaultMiddleware(),
  socketMiddleware,
  asyncDispatchMiddleware,
];
const reducer = {
  conversations: conversationsReducer,
  auth: authReducer,
  me: meReducer,
  messages: messageReducer,
  socket: socketReducer,
  profiles: profileReducer,
  transaction: transactionReducer,
  config: configReducer,
  notification: notificationReducer,
  file: fileReducer,
};

const store = configureStore({ reducer, middleware });

export default store;

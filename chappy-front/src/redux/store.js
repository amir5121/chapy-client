import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import conversationsReducer from "./reducer/ConversationsSlice";
import authReducer from "./reducer/AuthSlice";
import messageReducer from "./reducer/MessageSlice";
import socketReducer from "./reducer/SocketSlice";
import profileReducer from "./reducer/ProfileSlice";
import socketMiddleware from "./middleware/SocketMiddleware";

//https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
const middleware = [...getDefaultMiddleware(), socketMiddleware];
const reducer = {
  conversations: conversationsReducer,
  auth: authReducer,
  messages: messageReducer,
  socket: socketReducer,
  profiles: profileReducer,
};

const store = configureStore({ reducer, middleware });

export default store;

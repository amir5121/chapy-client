import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import conversationsReducer from "./reducer/ConversationsSlice";
import authReducer from "./reducer/AuthSlice";
import socketMiddleware from "./middleware/SocketMiddleware";

//https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
const middleware = [...getDefaultMiddleware(), socketMiddleware];
const reducer = {
  conversations: conversationsReducer,
  auth: authReducer,
};

const store = configureStore({ reducer, middleware });

export default store;

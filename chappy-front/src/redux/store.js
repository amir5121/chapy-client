import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import chatReducer from "../module/chat/ChatSlice";
import socketMiddleware from "./middleware/SocketMiddleware";

//https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
const middleware = [...getDefaultMiddleware(), socketMiddleware];
const reducer = { chat: chatReducer };

const store = configureStore({ reducer, middleware });

export default store;

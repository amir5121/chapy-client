import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./reducers/UsersSlice";
import authReducer from "./reducers/AuthSlice";
import socketMiddleware from "./middleware/SocketMiddleware";

//https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
const middleware = [...getDefaultMiddleware(), socketMiddleware];
const reducer = {
  users: userReducer,
  auth: authReducer,
};

const store = configureStore({ reducer, middleware });

export default store;

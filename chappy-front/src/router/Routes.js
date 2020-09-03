import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "../module/chat/Chat";
import Home from "../module/home/Home";
import PrivateRoute from "./PrivateRoute";
import NormalLoginForm from "../module/login/Login";
import Conversations from "../module/conversations/Conversations";
import { getMe } from "../redux/reducer/AuthSlice";
import { useDispatch } from "react-redux";

const Routes = () => {
  const dispatch = useDispatch();
  dispatch(getMe());

  return (
    <Router>
      <Switch>
        <Route path="/login" component={NormalLoginForm} />
        <PrivateRoute path="/chat/:userId" component={Chat} />
        <PrivateRoute path="/chat" component={Conversations} />
        <PrivateRoute path="/profile" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routes;

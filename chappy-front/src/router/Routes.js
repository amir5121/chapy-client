import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "../module/chat/Chat";
import Home from "../module/home/Home";
import PrivateRoute from "./PrivateRoute";
import NormalLoginForm from "../module/login/Login";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat/:userId?">
          <Chat />
        </Route>
        <Route path="/login">
          <NormalLoginForm />
        </Route>
        <PrivateRoute path="/profile">
          <Home />
        </PrivateRoute>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;

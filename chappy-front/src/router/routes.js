import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "../module/chat/Chat";
import Home from "../module/home/Home";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <PrivateRoute path="/profile">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;

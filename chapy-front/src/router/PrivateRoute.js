import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from "../utils/Authenticate";

const PrivateRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: "/login/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

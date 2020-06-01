import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
            alert("You Need to Be Signed in to view this Page")
          return (
            <Redirect
              to={{
                pathname: "/alogin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute

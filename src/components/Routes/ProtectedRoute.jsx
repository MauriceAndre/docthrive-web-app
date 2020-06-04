import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Route from "./Route";

const ProtectedRoute = ({ component: Component, render, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);

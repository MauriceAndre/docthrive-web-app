import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./Route";
import NotFound from "../NotFound/NotFound";
import Archive from "../Archive/Archive";
import Register from "./../Register";
import Login from "./../Login";
import Logout from "./../Logout";
import ProtectedRoute from "./../common/ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/archive/:id" component={Archive} />
      <ProtectedRoute path="/archive" component={Archive} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/not-found" component={NotFound} />
      <Redirect path="/" exact to="/archive" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

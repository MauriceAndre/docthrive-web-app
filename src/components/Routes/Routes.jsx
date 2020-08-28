import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./Route";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../NotFound/NotFound";
import Archive from "../Archive/Archive";
import Register from "./../Register";
import Login from "./../Login";
import Logout from "./../Logout";
import MainNavbar from "./../MainNavbar/MainNavbar";
import Home from "./../Home";

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/archive/:id"
        component={Archive}
        header={MainNavbar}
      />
      <Redirect exact path="/archive" to="/archive/1" />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/not-found" component={NotFound} />
      <Route exact path="/" component={Home} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

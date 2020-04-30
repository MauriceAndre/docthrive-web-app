import React from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./Route";
import NotFound from "../NotFound/NotFound";
import Archive from "../Archive/Archive";

const Routes = () => {
  return (
    <Switch>
      <Route path="/not-found" component={NotFound} />
      <Route path="/archive/:id" component={Archive} />
      <Route path="/archive" component={Archive} />
      <Route path="/" exact component={Archive} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

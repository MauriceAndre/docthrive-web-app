import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./NotFound";
import Archive from "./Archive/Archive";

const Routes = () => {
  return (
    <Switch>
      <Route path="/not-found" component={NotFound} />
      <Route path="/" exact component={Archive} />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;

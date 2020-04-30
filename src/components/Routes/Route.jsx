import React from "react";
import { Route as RRDRoute } from "react-router-dom";
import history from "./history";

function Route(props) {
  const historyProp = props.history || history;
  delete props.history;

  return <RRDRoute history={historyProp} {...props} />;
}

export default Route;

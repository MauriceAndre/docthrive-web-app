import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "./components/Routes/history";
import { Provider } from "react-redux";
import store from "./store";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./main.scss";
import "./index.css";
import "./fontAwesome";

ReactDOM.render(
  <Suspense fallback="loading">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();

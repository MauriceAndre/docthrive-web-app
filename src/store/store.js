import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import archiveReducer from "./reducers/archive";
import appReducer from "./reducers/app";
import userReducer from "./reducers/user";
import history from "./../components/Routes/history";

const rootReducer = combineReducers({
  router: connectRouter(history),
  archive: archiveReducer,
  app: appReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;

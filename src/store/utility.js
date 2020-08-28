import store from "./store";

export function getState() {
  return store.getState();
}

export function getArchiveState() {
  return getState().archive;
}

export function getAppState() {
  return getState().app;
}

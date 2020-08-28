import history from "./../components/Routes/history";
import store from "./../store";

export const add = function (path, hist) {
  if (path === store.getState().router.location.pathname) return;

  hist = hist || history;
  hist.push(path);
};

export const getArchiveElementPath = (id) => {
  return `/archive/${id}`;
};

export const addArchiveElement = function (id, hist) {
  add(getArchiveElementPath(id), hist);
};

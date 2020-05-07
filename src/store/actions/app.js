import * as actionTypes from "./actionTypes";

export const setModal = (modal) => {
  return {
    type: actionTypes.SET_MODAL,
    modal,
  };
};

export const showModal = (show) => {
  return {
    type: actionTypes.SHOW_MODAL,
    show,
  };
};

export const setContextMenu = (contextMenu) => {
  return {
    type: actionTypes.SET_CONTEXT_MENU,
    contextMenu,
  };
};

export const showContextMenu = (show) => {
  return {
    type: actionTypes.SHOW_CONTEXT_MENU,
    show,
  };
};

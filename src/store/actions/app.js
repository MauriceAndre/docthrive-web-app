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

import * as actionTypes from "./actionTypes";

export const setSelectedElement = (element) => {
  return {
    type: actionTypes.SET_SELECTED_ELEMENT,
    value: element,
  };
};

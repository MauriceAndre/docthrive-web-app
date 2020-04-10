export const SET_SELECTED_ELEMENT = "SET_SELECTED_ELEMENT";

export const setSelectedElement = (element) => {
  return {
    type: SET_SELECTED_ELEMENT,
    value: element,
  };
};

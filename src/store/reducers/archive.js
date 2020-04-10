import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./../utility";

const initialState = {
  selectedElement: {},
};

const setSelectedElement = (state, action) => {
  let { selectedElement } = state;
  selectedElement = selectedElement.id !== action.value.id ? action.value : {};

  return updateObject(state, { selectedElement });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ELEMENT:
      return setSelectedElement(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

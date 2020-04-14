import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./../utility";

const initialState = {
  selectedElement: {},
  workVersion: null,
  elementTypes: [],
};

const setSelectedElement = (state, action) => {
  let { selectedElement } = state;
  selectedElement = selectedElement.id !== action.value.id ? action.value : {};

  return updateObject(state, { selectedElement });
};

const setElementTypes = (state, action) => {
  return updateObject(state, { elementTypes: action.value });
};

const setWorkVersion = (state, action) => {
  return updateObject(state, { workVersion: action.value });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ELEMENT:
      return setSelectedElement(state, action);
    case actionTypes.SET_ELEMENT_TYPES:
      return setElementTypes(state, action);
    case actionTypes.SET_WORK_VERSION:
      return setWorkVersion(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

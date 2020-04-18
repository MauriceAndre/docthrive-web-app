import * as actionTypes from "../actions/actionTypes";
import { replaceById } from "./../../utils/elementUtils";
import { updateObject } from "./../../utils/objectUtils";

const initialState = {
  elements: [],
  selectedElement: {},
  workVersion: null,
  elementTypes: [],
};

const addElements = (state, { elements }) => {
  elements = [...state.elements, ...elements];
  return updateObject(state, { elements });
};

const updateElement = (state, { id, element }) => {
  const elements = replaceById(id, element, state.elements);
  return updateObject(state, { elements });
};

const setSelectedElement = (state, { selectedElement }) => {
  return updateObject(state, { selectedElement });
};

const setElementTypes = (state, { elementTypes }) => {
  return updateObject(state, { elementTypes });
};

const setWorkVersion = (state, { workVersion }) => {
  return updateObject(state, { workVersion });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ELEMENTS:
      return addElements(state, action);
    case actionTypes.UPDATE_ELEMENT:
      return updateElement(state, action);
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

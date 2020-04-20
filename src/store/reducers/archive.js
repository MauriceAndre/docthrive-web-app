import * as actionTypes from "../actions/actionTypes";
import * as elementUtils from "./../../utils/elementUtils";
import { updateObject } from "./../../utils/objectUtils";

const initialState = {
  elements: [],
  selectedElement: {},
  workVersion: null,
  elementTypes: [],
  labels: [],
};

const addElements = (state, { elements, populate }) => {
  const dataset = { labels: state.labels, type: state.elementTypes };

  if (populate) {
    elements = elements.map((element) =>
      elementUtils.populate(element, dataset)
    );
  }

  elements = [...state.elements, ...elements];
  return updateObject(state, { elements });
};

const updateElement = (state, { id, element }) => {
  const elements = elementUtils.replaceById(id, element, state.elements);
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

const setLabels = (state, { labels }) => {
  return updateObject(state, { labels });
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
    case actionTypes.SET_LABELS:
      return setLabels(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

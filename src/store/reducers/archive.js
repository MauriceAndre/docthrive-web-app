import * as actionTypes from "../actions/actionTypes";
import * as elementUtils from "./../../utils/elementUtils";
import { updateObject } from "./../../utils/objectUtils";
import config from "./../../services/configService";
import * as titleUtils from "../../utils/titleUtils";

const initialState = {
  elements: [elementUtils.getRootElement()],
  deletedElements: [],
  selectedElement: {},
  workVersion: null,
  elementTypes: [],
  labels: [],
  contentView: config.default.contentView,
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
  const props = { elements };

  if (id === state.selectedElement._id) {
    props.selectedElement = element;
    titleUtils.setArchiveElement(element);
  }

  return updateObject(state, props);
};

const deleteElement = (state, { element }) => {
  const elements = elementUtils.removeById(element._id, state.elements);
  const deletedElements = [...state.deletedElements, element];
  const props = { elements, deletedElements };

  if (elementUtils.isSelectedElement(element._id, state.selectedElement))
    props.selectedElement = elementUtils.findById(element.parentId, elements);

  return updateObject(state, props);
};

const setSelectedElement = (state, { selectedElement }) => {
  titleUtils.setArchiveElement(selectedElement);
  return updateObject(state, { selectedElement });
};

const setElementTypes = (state, { elementTypes }) => {
  return updateObject(state, { elementTypes });
};

const setWorkVersion = (state, { workVersion }) => {
  const props = { workVersion };

  if (workVersion) {
    // add docVersion to element and update element in elements
    let element = elementUtils.findById(workVersion.elementId, state.elements);
    element = updateObject(element, { docVersion: workVersion });
    const elements = elementUtils.replaceById(
      element._id,
      element,
      state.elements
    );

    props.elements = elements;

    // update selectedElement
    if (state.selectedElement._id === element._id)
      props.selectedElement = element;
  }

  return updateObject(state, props);
};

const setLabels = (state, { labels }) => {
  return updateObject(state, { labels });
};

const setContentView = (state, { view }) => {
  return updateObject(state, { contentView: view });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ELEMENTS:
      return addElements(state, action);
    case actionTypes.UPDATE_ELEMENT:
      return updateElement(state, action);
    case actionTypes.DELETE_ELEMENT:
      return deleteElement(state, action);
    case actionTypes.SET_SELECTED_ELEMENT:
      return setSelectedElement(state, action);
    case actionTypes.SET_ELEMENT_TYPES:
      return setElementTypes(state, action);
    case actionTypes.SET_WORK_VERSION:
      return setWorkVersion(state, action);
    case actionTypes.SET_LABELS:
      return setLabels(state, action);
    case actionTypes.SET_CONTENT_VIEW:
      return setContentView(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

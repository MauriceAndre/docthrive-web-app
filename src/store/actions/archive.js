import * as actionTypes from "./actionTypes";
import * as elementTypeService from "../../services/elementTypeService";
import * as docVersionService from "../../services/docVersionService";
import * as elementService from "../../services/elementService";
import * as labelService from "../../services/labelService";
import config from "./../../services/configService";
import { updateObject } from "./../../utils/objectUtils";
import * as elementUtils from "./../../utils/elementUtils";
import { funcIteration } from "../../utils/arrayUtils";
import * as historyUtils from "./../../utils/historyUtils";

const availableParents = [];

export const addAvailableParent = (parentId) => {
  availableParents.push(parentId);
};

export const addElements = (elements, populate) => {
  return {
    type: actionTypes.ADD_ELEMENTS,
    elements,
    populate,
  };
};

export const createElement = (data) => {
  return async (dispatch) => {
    const element = elementUtils.createElement(data);
    dispatch(addElements([element], false));
    await elementService.saveElement(element);
  };
};

export const createFolder = (data) => {
  data.type = data.type || config.default.types.folder;
  data = elementUtils.populateWithStore(data, {
    type: true,
  });
  return createElement(data);
};

export const updateElement = (id, element) => {
  return {
    type: actionTypes.UPDATE_ELEMENT,
    id,
    element,
  };
};

export const moveElement = (element, parentId) => {
  return async (dispatch) => {
    element = updateObject(element, { parentId });
    dispatch(updateElement(element._id, element));
    // await server call
  };
};

export const copyElement = (element, newParentId) => {
  return async (dispatch) => {
    const newElement = elementUtils.copyElement(element, newParentId);
    dispatch(addElements([newElement], false));
    // await server call
  };
};

export const uploadDocuments = (data, files) => {
  return async (dispatch) => {
    const elements = funcIteration(files, [
      { func: elementUtils.fileToElement, params: (file) => [data, file] },
      {
        func: elementUtils.populateWithStore,
        params: (element) => [element, { type: true }],
      },
    ]);

    dispatch(addElements(elements, false));
    // upload documents
  };
};

export const getChildren = (parentId) => {
  if (!availableParents.includes(parentId)) {
    addAvailableParent(parentId);
    return async (dispatch) => {
      const children = await elementService.getChildren(parentId);
      dispatch(addElements(children, true));
    };
  }
  return { type: actionTypes.CANCEL };
};

export const setSelectedElement = (element) => {
  historyUtils.addArchiveElement(element._id);
  return {
    type: actionTypes.SET_SELECTED_ELEMENT,
    selectedElement: element,
  };
};

export const setSelectedElementById = (id) => {
  const element = elementUtils.findById(id) || elementUtils.getRootElement();
  return setSelectedElement(element);
};

export const storeSelectedElement = (element) => {
  return async (dispatch) => {
    dispatch(setSelectedElement(element));
    const func = getWorkVersion(element._id);
    await func(dispatch);
  };
};

export const setWorkVersion = (workVersion) => {
  return {
    type: actionTypes.SET_WORK_VERSION,
    workVersion,
  };
};

export const getWorkVersion = (elementId) => {
  return async (dispatch) => {
    const workVersion = await docVersionService.getWorkVersion(elementId);
    dispatch(setWorkVersion(workVersion));
  };
};

export const setElementTypes = (elementTypes) => {
  return {
    type: actionTypes.SET_ELEMENT_TYPES,
    elementTypes,
  };
};

export const getElementTypes = () => {
  return async (dispatch) => {
    const elementTypes = await elementTypeService.getAllElementTypes();
    dispatch(setElementTypes(elementTypes));
  };
};

export const setLabels = (labels) => {
  return {
    type: actionTypes.SET_LABELS,
    labels,
  };
};

export const getLabels = () => {
  return async (dispatch) => {
    const labels = await labelService.getAllLabels();
    dispatch(setLabels(labels));
  };
};

export const setContentView = (view) => {
  return {
    type: actionTypes.SET_CONTENT_VIEW,
    view,
  };
};

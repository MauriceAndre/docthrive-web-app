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
import { handleCatch } from "./../../utils/errorHandler";

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

export const addElement = (element, populate) => {
  return addElements([element], populate);
};

export const createElement = (data) => {
  return async (dispatch) => {
    const element = elementUtils.createElement(data);
    dispatch(addElement(element, false));

    // send request to server and update view
    try {
      const res = await elementService.createElement(element);
      const resElement = res.data;
      dispatch(updateElementInStore(element._id, resElement, true));
    } catch (ex) {
      handleCatch(ex);
      dispatch(deleteElementInStore(element));
    }
  };
};

export const createFolder = (data) => {
  data.type = data.type || config.default.types.folder;
  data = elementUtils.populateWithStore(data, {
    type: true,
  });
  return createElement(data);
};

export const updateElementInStore = (id, element, populate) => {
  return {
    type: actionTypes.UPDATE_ELEMENT,
    id,
    element,
    populate,
  };
};

export const updateElement = (id, element, oldElement) => {
  return async (dispatch) => {
    dispatch(updateElementInStore(id, element));

    try {
      const res = await elementService.updateElement(element);
      const resElement = res.data;
      dispatch(updateElementInStore(id, resElement, true));
    } catch (ex) {
      handleCatch(ex);
      dispatch(updateElementInStore(id, oldElement));
    }
  };
};

export const moveElement = (element, parentId) => {
  return (dispatch) => {
    const uElement = updateObject(element, { parentId });
    dispatch(updateElement(element._id, uElement, element));
  };
};

export const copyElement = (element, newParentId) => {
  return (dispatch) => {
    const newElement = elementUtils.copyElement(element, newParentId);
    dispatch(createElement(newElement));
  };
};

export const deleteElementInStore = (element) => {
  return {
    type: actionTypes.DELETE_ELEMENT,
    element,
  };
};

export const deleteElement = (element) => {
  return async (dispatch) => {
    element = updateObject(element, { deleted: true });
    dispatch(deleteElementInStore(element));

    try {
      await elementService.deleteElement(element._id);
    } catch (ex) {
      handleCatch(ex);
      element = updateObject(element, { deleted: false });
      dispatch(addElement(element));
    }
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
      try {
        dispatch(setLoading(parentId));
        const res = await elementService.getChildren(parentId);
        const children = res.data;
        dispatch(addElements(children, true));
      } catch (ex) {
        handleCatch(ex);
      }
      dispatch(setLoading(null));
    };
  }
  return async () => {};
};

export const setLoading = (id) => {
  return {
    type: actionTypes.SET_LOADING,
    id,
  };
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

    if (elementUtils.isDocument(element)) {
      const func = getWorkVersion(element._id);
      await func(dispatch);
    }
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
export const setContentSorting = (sorting) => {
  return {
    type: actionTypes.SET_CONTENT_SORTING,
    sorting,
  };
};

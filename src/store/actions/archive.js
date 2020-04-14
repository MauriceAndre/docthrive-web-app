import * as actionTypes from "./actionTypes";
import * as elementType from "../../services/elementTypeService";
import * as docVersion from "../../services/docVersionService";

export const setSelectedElement = (element) => {
  return {
    type: actionTypes.SET_SELECTED_ELEMENT,
    value: element,
  };
};

export const storeSelectedElement = (element) => {
  return async (dispatch) => {
    dispatch(setSelectedElement(element));
    const func = getWorkVersion(element.id);
    await func(dispatch);
  };
};

export const setWorkVersion = (workVersion) => {
  return {
    type: actionTypes.SET_WORK_VERSION,
    value: workVersion,
  };
};

export const getWorkVersion = (elementId) => {
  return async (dispatch) => {
    const workVersion = await docVersion.getWorkVersion(elementId);
    dispatch(setWorkVersion(workVersion));
  };
};

export const setElementTypes = (elementTypes) => {
  return {
    type: actionTypes.SET_ELEMENT_TYPES,
    value: elementTypes,
  };
};

export const getElementTypes = () => {
  return async (dispatch) => {
    const elementTypes = await elementType.getAllElementTypes();
    dispatch(setElementTypes(elementTypes));
  };
};

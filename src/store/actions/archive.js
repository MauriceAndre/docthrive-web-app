import * as actionTypes from "./actionTypes";
import { getAllElementTypes } from "../../services/elementTypeService";

export const setSelectedElement = (element) => {
  return {
    type: actionTypes.SET_SELECTED_ELEMENT,
    value: element,
  };
};

export const setElementTypes = (elementTypes) => {
  return {
    type: actionTypes.SET_ELEMENT_TYPES,
    value: elementTypes,
  };
};

export const updateElementTypes = () => {
  return async (dispatch) => {
    const elementTypes = await getAllElementTypes();
    dispatch(setElementTypes(elementTypes));
  };
};

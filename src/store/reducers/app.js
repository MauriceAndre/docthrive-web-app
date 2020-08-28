import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./../../utils/objectUtils";

const initialState = {
  modal: {},
  contextMenu: {},
  sidebar: {},
};

const setModal = (state, { modal }) => {
  return updateObject(state, { modal });
};

const showModal = (state, { show }) => {
  const modal = updateObject(state.modal, { show });
  return updateObject(state, { modal });
};

const setContextMenu = (state, { contextMenu }) => {
  return updateObject(state, { contextMenu });
};

const showContextMenu = (state, { show }) => {
  const contextMenu = updateObject(state.contextMenu, { show });
  return updateObject(state, { contextMenu });
};

const setSidebar = (state, { sidebar }) => {
  return updateObject(state, { sidebar });
};

const showSidebar = (state, { show }) => {
  const sidebar = updateObject(state.sidebar, { show });
  return updateObject(state, { sidebar });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return setModal(state, action);
    case actionTypes.SHOW_MODAL:
      return showModal(state, action);
    case actionTypes.SET_CONTEXT_MENU:
      return setContextMenu(state, action);
    case actionTypes.SHOW_CONTEXT_MENU:
      return showContextMenu(state, action);
    case actionTypes.SET_SIDEBAR:
      return setSidebar(state, action);
    case actionTypes.SHOW_SIDEBAR:
      return showSidebar(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

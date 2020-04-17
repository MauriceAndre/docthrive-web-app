import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  modal: null,
};

const setModal = (state, { modal }) => {
  return updateObject(state, { modal });
};

const showModal = (state, { show }) => {
  const modal = updateObject(state.modal, { show });
  return updateObject(state, { modal });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return setModal(state, action);
    case actionTypes.SHOW_MODAL:
      return showModal(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

import * as actionTypes from "../actions/archive";

const initialState = {
  selectedElement: {},
};

const reducer = (state = initialState, action) => {
  let { selectedElement } = state;

  switch (action.type) {
    case actionTypes.SET_SELECTED_ELEMENT:
      selectedElement =
        selectedElement.id !== action.value.id ? action.value : {};
      return {
        ...state,
        selectedElement,
      };
    default:
      break;
  }

  return state;
};

export default reducer;

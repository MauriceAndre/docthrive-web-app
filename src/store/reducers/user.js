import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "./../../utils/objectUtils";

const initialState = {
  user: null,
};

const setUser = (state, { user }) => {
  return updateObject(state, { user });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return setUser(state, action);
    default:
      break;
  }

  return state;
};

export default reducer;

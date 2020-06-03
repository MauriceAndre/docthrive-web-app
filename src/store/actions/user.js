import * as actionTypes from "./actionTypes";
import authService from "../../services/authService";

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user,
  };
};

export const updateUser = () => {
  const user = authService.getCurrentUser();
  return setUser(user);
};

export const logoutUser = () => {
  const user = null;
  return setUser(user);
};

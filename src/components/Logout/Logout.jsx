import { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../store/actions/index";
import { logout } from "./../../services/authService";

function Logout({ logoutUser }) {
  useEffect(() => {
    logout();
    logoutUser();

    window.location = "/";
  }, [logoutUser]);
  return null;
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(actionCreators.logoutUser()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);

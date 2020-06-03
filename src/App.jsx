import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";
import "./App.css"; // don't move!
import Routes from "./components/Routes";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import ModalHandler from "./components/ModalHandler";
import ContextMenuHandler from "./components/ContextMenuHandler";
import SidebarHandler from "./components/SidebarHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ showContextMenu, updateUser }) => {
  updateUser();

  return (
    <div
      className="App section flex-column"
      onClick={() => showContextMenu(false)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <MainNavbar />
      <main className="section-wrapper section-fill">
        <Routes />
        <SidebarHandler />
      </main>
      <ModalHandler />
      <ContextMenuHandler />
      <ToastContainer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showContextMenu: (show) => dispatch(actionCreators.showContextMenu(show)),
    updateUser: () => dispatch(actionCreators.updateUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);

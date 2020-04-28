import React, { Component } from "react";
import "./App.css"; // don't move!
import Routes from "./components/Routes";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import ModalHandler from "./components/ModalHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App section flex-column">
        <MainNavbar />
        <main className="section-wrapper section-fill">
          <Routes />
        </main>
        <ModalHandler />
        <ToastContainer />
      </div>
    );
  }
}

export default App;

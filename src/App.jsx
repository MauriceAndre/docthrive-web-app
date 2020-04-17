import React, { Component } from "react";
import "./App.css";
import MainNavbar from "./components/MainNavbar/MainNavbar";
import ModalHandler from "./components/ModalHandler";
import Routes from "./components/Routes";

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
      </div>
    );
  }
}

export default App;

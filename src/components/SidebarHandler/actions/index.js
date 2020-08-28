import React from "react";
import store from "./../../../store/store";
import * as actionCreators from "./../../../store/actions/index";
import { slideOutRight, slideInRight } from "react-animations";
import MetaSidebar from "./../../Archive/components/MetaSidebar";

const showSidebar = (show) => store.dispatch(actionCreators.showSidebar(show));

export const elementMeta = (element) => {
  return {
    body: <MetaSidebar element={element} />,
    onClose: () => showSidebar(false),
    close: true,
    show: true,
    right: true,
    animationIn: slideInRight,
    animationOut: slideOutRight,
    animationDuration: 0.5,
  };
};

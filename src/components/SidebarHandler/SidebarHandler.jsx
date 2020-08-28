import React from "react";
import { connect } from "react-redux";
import Sidebar from "../common/Sidebar";

function SidebarHandler({ sidebar }) {
  const props = { ...sidebar };

  return <Sidebar {...props} />;
}

const mapStateToProps = ({ app }) => {
  return {
    sidebar: app.sidebar,
  };
};

export default connect(mapStateToProps)(SidebarHandler);

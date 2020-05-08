import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContextMenu from "./../common/ContextMenu";

function ContextMenuHandler({ contextMenu }) {
  contextMenu = contextMenu || {};
  const props = {
    ...contextMenu,
  };

  return contextMenu.show ? <ContextMenu {...props} /> : null;
}

ContextMenuHandler.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  x: PropTypes.number,
  y: PropTypes.number,
};

const mapStateToProps = ({ app }) => {
  return {
    contextMenu: app.contextMenu,
  };
};

export default connect(mapStateToProps)(ContextMenuHandler);

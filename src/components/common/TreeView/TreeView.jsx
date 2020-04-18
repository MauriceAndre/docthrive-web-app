import React from "react";
import PropTypes from "prop-types";
import Root from "./components/Root/Root";
import { join } from "./../../../utils/arrayUtils";
import style from "./TreeView.module.css";

const TreeView = ({
  selectedId,
  onSelect,
  getChildren,
  elements,
  onlyFolders,
}) => {
  const props = {
    selectedId,
    onSelect,
    getChildren,
    elements,
    onlyFolders,
  };

  return (
    <div className={join([style["tree-view"], "text-left unselectable"])}>
      <ul>
        <Root {...props} />
      </ul>
    </div>
  );
};

TreeView.propTypes = {
  getChildren: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onlyFolders: PropTypes.bool,
};

export default TreeView;

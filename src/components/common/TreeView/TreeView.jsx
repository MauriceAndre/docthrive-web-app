import React from "react";
import PropTypes from "prop-types";
import Root from "./components/Root/Root";
import { join } from "./../../../utils/arrayUtils";
import { sort } from "../../../utils/elementUtils";
import { updateObject } from "./../../../utils/objectUtils";
import style from "./TreeView.module.css";

const TreeView = (props) => {
  let { elements, onContextMenu } = props;
  onContextMenu = onContextMenu || (() => {});
  elements = sort(elements, ["type._id", "name"]);

  props = updateObject(props, { elements, onContextMenu });

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
  rootElement: PropTypes.object,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onlyFolders: PropTypes.bool,
  onContextMenu: PropTypes.func,
};

export default TreeView;

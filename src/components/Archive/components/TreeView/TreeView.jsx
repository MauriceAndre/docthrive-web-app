import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import Tree from "../../../common/TreeView/TreeView";

const TreeView = ({
  selectedElement,
  onSelectElement,
  elements,
  getChildren,
}) => {
  const handleGetChildren = (parentId) => {
    getChildren(parentId);
  };

  return (
    <Tree
      selectedId={selectedElement._id}
      onSelect={onSelectElement}
      getChildren={handleGetChildren}
      elements={elements}
    />
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
    elements: archive.elements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectElement: (...params) =>
      dispatch(actionCreators.storeSelectedElement(...params)),
    getChildren: (...params) => dispatch(actionCreators.getChildren(...params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TreeView);

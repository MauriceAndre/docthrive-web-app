import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import Tree from "../../../common/TreeView/TreeView";

const TreeView = ({
  selectedElement,
  onSelectElement,
  elements,
  getChildren,
  availableParents,
}) => {
  const handleGetChildren = (parentId) => {
    if (!availableParents.includes(parentId))
      getChildren(parentId, availableParents);
  };

  return (
    <Tree
      selectedId={selectedElement.id}
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
    availableParents: archive.availableParents,
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

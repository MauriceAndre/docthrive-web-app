import React from "react";
import { connect } from "react-redux";
import * as contextMenuActions from "./../../../ContextMenuHandler/actions/index";
import { onContextMenu } from "./../../../ContextMenuHandler/utility";
import * as actionCreators from "../../../../store/actions/index";
import Tree from "../../../common/TreeView";

const TreeView = ({
  selectedElement,
  onSelectElement,
  elements,
  getChildren,
  loadingId,
}) => {
  const handleGetChildren = (parentId) => {
    getChildren(parentId);
  };

  const handleContextMenu = (e, element) =>
    onContextMenu(e, contextMenuActions.elementItem(element));

  return (
    <Tree
      selectedId={selectedElement._id}
      elements={elements}
      loadingId={loadingId}
      onSelect={onSelectElement}
      getChildren={handleGetChildren}
      onContextMenu={handleContextMenu}
    />
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
    elements: archive.elements,
    loadingId: archive.loading,
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

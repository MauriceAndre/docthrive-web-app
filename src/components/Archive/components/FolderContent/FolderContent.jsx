import React from "react";
import { connect } from "react-redux";
import * as contextMenuActions from "./../../../ContextMenuHandler/actions/index";
import { onContextMenu } from "./../../../ContextMenuHandler/utility";
import * as actionCreators from "../../../../store/actions/index";
import { findByParentId, sort } from "../../../../utils/elementUtils";
import FolderListView from "../FolderListView";
import FolderGridView from "../FolderGridView";

const FolderContent = ({
  onSelectElement,
  elements,
  element,
  getChildren,
  view,
  sorting,
  loadingId,
}) => {
  const { _id } = element;
  const loading = loadingId === _id;

  getChildren(_id);
  elements = findByParentId(_id, elements);

  // sorting
  const { key: sortKey, order } = sorting;
  const sortKeys = [sortKey];
  const sortOrder = [order.key];
  elements = sort(elements, sortKeys, sortOrder);

  const handleContextMenu = (e, el) =>
    onContextMenu(e, contextMenuActions.elementItem(el));

  const getView = function () {
    const props = {
      elements,
      loading,
      onSelectElement,
      onContextMenu: handleContextMenu,
    };

    switch (view.key) {
      case "grid":
        return <FolderGridView {...props} />;
      case "list":
      default:
        return <FolderListView {...props} />;
    }
  };

  return (
    <div className="section section-column overflow-auto">
      <div className="section-wrapper section-fill">{getView()}</div>
      <div
        className="section-wrapper"
        onContextMenu={(e) => handleContextMenu(e, element)}
      ></div>
    </div>
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
    view: archive.contentView,
    sorting: archive.contentSorting,
    loadingId: archive.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectElement: (element) =>
      dispatch(actionCreators.storeSelectedElement(element)),
    getChildren: (parentId) => dispatch(actionCreators.getChildren(parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderContent);

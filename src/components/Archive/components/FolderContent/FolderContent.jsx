import React from "react";
import { connect } from "react-redux";
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
}) => {
  const { _id } = element;

  getChildren(_id);
  elements = findByParentId(_id, elements);
  elements = sort(elements);

  const getView = function () {
    const props = {
      elements,
      onSelectElement,
    };

    switch (view.key) {
      case "grid":
        return <FolderGridView {...props} />;
      case "list":
      default:
        return <FolderListView {...props} />;
    }
  };

  return <div className="section overflow-auto">{getView()}</div>;
};

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
    view: archive.contentView,
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

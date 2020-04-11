import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { getChildren } from "../../../../services/elementService";
import TreeView from "../../../common/TreeView/TreeView";

class ArchiveTree extends Component {
  state = {
    rootElements: [],
  };

  componentDidMount = async () => {
    const rootElements = await getChildren(1);

    this.setState({ rootElements });
  };

  getChildren = async (parentId) => {
    return await getChildren(parentId);
  };

  render() {
    const { selectedElement, onSelectElement } = this.props;
    const { rootElements } = this.state;

    return (
      <TreeView
        rootElements={rootElements}
        selectedId={selectedElement.id}
        onSelect={onSelectElement}
        getChildren={this.getChildren}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedElement: state.archive.selectedElement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectElement: (element) =>
      dispatch(actionCreators.setSelectedElement(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveTree);

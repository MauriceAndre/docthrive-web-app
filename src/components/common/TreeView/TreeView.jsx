import React, { Component } from "react";
import PropTypes from "prop-types";
import Root from "./components/Root/Root";
import { join } from "./../../../utils/arrayUtils";
import style from "./TreeView.module.css";

class TreeView extends Component {
  render() {
    const { selectedId, onSelect, getChildren } = this.props;
    const props = {
      selectedId,
      onSelect,
      getChildren,
    };

    return (
      <div className={join([style["tree-view"], "text-left unselectable"])}>
        <ul>
          <Root {...props} />
        </ul>
      </div>
    );
  }
}

TreeView.propTypes = {
  selectedId: PropTypes.number,
  onSelect: PropTypes.func,
  getChildren: PropTypes.func,
};

export default TreeView;

import React, { Component } from "react";
import PropTypes from "prop-types";
import { join } from "./../../../../../utils/arrayUtils";
import { findByParentId } from "../../../../../utils/elementUtils";
import { renderChild } from "./../../utility";
import style from "./../../TreeView.module.css";

class Folder extends Component {
  state = {
    expanded: false,
  };

  handleExpand = async () => {
    const { element, getChildren } = this.props;
    const { expanded } = this.state;

    getChildren(element.id);
    this.setState({ expanded: !expanded });
  };

  render() {
    const { expanded } = this.state;
    const { element, selectedId, onSelect, elements } = this.props;
    const { id, name } = element;

    const children = findByParentId(id, elements);

    return (
      <li className={join([style.folder, expanded && style.show])}>
        <div
          onDoubleClick={() => this.handleExpand()}
          className={join([
            style["folder-content"],
            "d-flex",
            selectedId === id && style.selected,
          ])}
        >
          <span
            className={style["caret-icon"]}
            onClick={() => this.handleExpand()}
          />
          <div
            className={style["folder-icon"]}
            onClick={() => onSelect(element)}
          >
            {name}
          </div>
        </div>
        {children && (
          <ul>{children.map((child) => renderChild(child, this))}</ul>
        )}
      </li>
    );
  }
}

Folder.propTypes = {
  getChildren: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
};

export default Folder;

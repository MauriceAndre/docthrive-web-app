import React, { Component } from "react";
import PropTypes from "prop-types";
import { join } from "./../../../../../utils/arrayUtils";
import { renderChild } from "./../../utility";
import style from "../../TreeView.module.css";

class Folder extends Component {
  state = {
    children: [],
    expanded: false,
  };

  handleExpand = async () => {
    const { element, getChildren } = this.props;
    const { expanded } = this.state;

    const children = await getChildren(element.id);
    this.setState({ expanded: !expanded, children });
  };

  render() {
    const { children, expanded } = this.state;
    const { element, selectedId, onSelect } = this.props;
    const { id, name } = element;

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
  selectedId: PropTypes.number,
  onSelect: PropTypes.func,
  getChildren: PropTypes.func,
};

export default Folder;

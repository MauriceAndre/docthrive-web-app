import React, { Component } from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import Icon from "./../../../Icon";
import { join } from "./../../../../../utils/arrayUtils";
import { findByParentId } from "../../../../../utils/elementUtils";
import { findExpand } from "../../../../../utils/elementTypeUtils";
import { renderChild } from "./../../utility";
import style from "./../../TreeView.module.css";

class Folder extends Component {
  state = {
    expanded: false,
  };

  handleExpand = async () => {
    const { element, getChildren } = this.props;
    const { expanded } = this.state;

    getChildren(element._id);
    this.setState({ expanded: !expanded });
  };

  render() {
    const { expanded } = this.state;
    const {
      element,
      selectedId,
      onSelect,
      elements,
      onContextMenu,
    } = this.props;
    const { _id, name, badge } = element;
    const type = expanded ? findExpand(element.type.name) : element.type;
    const isSelected = selectedId === _id;

    const children = findByParentId(_id, elements);

    return (
      <li className={join([style.folder, expanded && style.show])}>
        <div
          onDoubleClick={() => this.handleExpand()}
          onContextMenu={(e) => onContextMenu(e, element)}
          className={join([
            style["folder-li"],
            "d-flex",
            isSelected && style.selected,
          ])}
        >
          <span
            className={style["caret-icon"]}
            onClick={() => this.handleExpand()}
          />
          <div
            className={join([
              "d-flex align-items-center",
              style["folder-content"],
            ])}
            onClick={() => onSelect(element)}
          >
            <Icon
              name={type ? type.icon : element.type.icon}
              text={name}
              className={style["folder-icon"]}
            />
            {badge && (
              <Badge variant="primary" className={style["folder-badge"]}>
                {badge}
              </Badge>
            )}
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
  element: PropTypes.object.isRequired,
  getChildren: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default Folder;

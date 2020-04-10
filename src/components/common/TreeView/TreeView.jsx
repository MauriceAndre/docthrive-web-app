import React, { Component } from "react";
import { join } from "./../../../utils/arrayUtils";
import { withTranslation } from "react-i18next";
import { initT, t } from "../../../utils/intl";
import style from "./TreeView.module.css";

class TreeView extends Component {
  state = {
    expanded: [],
  };

  handleSelect = null;
  selected = null;

  handleExpand(id) {
    let expanded = [...this.state.expanded];

    if (expanded.indexOf(id) > -1) {
      expanded = expanded.filter((value) => value !== id);
    } else {
      expanded.push(id);
    }

    this.setState({ expanded });
  }

  renderTree(element) {
    let result;

    if (element.type > 256) {
      // folder
      result = this.renderFolder(element);
    } else {
      // file
      result = this.renderFile(element);
    }

    return result;
  }

  renderFolder(element) {
    const { id, name, children } = element;
    const { expanded } = this.state;

    return (
      <li
        key={id}
        className={join([
          style.folder,
          expanded.indexOf(id) > -1 && style.show,
        ])}
      >
        <div
          onDoubleClick={() => this.handleExpand(id)}
          className={join([
            style["folder-content"],
            "d-flex",
            id === this.selected.id && style.selected,
          ])}
        >
          <span
            className={style["caret-icon"]}
            onClick={() => this.handleExpand(id)}
          />
          <div
            className={style["folder-icon"]}
            onClick={() => this.handleSelect(element)}
          >
            {name}
          </div>
        </div>
        {children && <ul>{children.map((child) => this.renderTree(child))}</ul>}
      </li>
    );
  }

  renderFile(element) {
    const { id, name } = element;

    return (
      <li key={id} className={style.file}>
        <div
          onClick={() => this.handleSelect(element)}
          className={join([
            style["file-icon"],
            id === this.selected.id && style.selected,
          ])}
        >
          <span>{name}</span>
        </div>
      </li>
    );
  }

  render() {
    const { tree = [], selected, onSelect } = this.props;
    this.handleSelect = onSelect;
    this.selected = selected;
    const rootId = 1;
    initT(this.props.t, "treeView");

    return (
      <div className={join([style["tree-view"], "text-left unselectable"])}>
        <ul>
          <li key={rootId} className={style.root}>
            <div
              onClick={() => this.handleSelect({ id: rootId })}
              className={join([
                style["archive-icon"],
                rootId === selected.id && style.selected,
              ])}
            >
              {t("archive")}
            </div>
            <ul>{tree.map((child) => this.renderTree(child, selected))}</ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default withTranslation()(TreeView);

import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { join } from "../../../../../utils/arrayUtils";
import { initT, t } from "../../../../../utils/intl";
import { findByParentId } from "../../../../../utils/elementUtils";
import { renderChild } from "./../../utility";
import style from "./../../TreeView.module.css";

class Root extends Component {
  rootElement = {
    id: 1,
    type: 257,
  };

  componentDidMount = async () => {
    const { rootElement, props } = this;
    const { getChildren, onSelect } = props;

    onSelect(rootElement);
    getChildren(rootElement.id);
  };

  render() {
    const { props, rootElement } = this;
    const { selectedId, onSelect, elements } = props;
    const { id } = rootElement;
    initT(this.props.t, "treeView");

    const children = findByParentId(id, elements);

    return (
      <li key={id} className={style.root}>
        <div
          onClick={() => onSelect(rootElement)}
          className={join([
            style["archive-icon"],
            id === selectedId && style.selected,
          ])}
        >
          {t("archive")}
        </div>
        <ul>{children.map((child) => renderChild(child, this))}</ul>
      </li>
    );
  }
}

Root.propTypes = {
  getChildren: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  selectedId: PropTypes.number,
  onSelect: PropTypes.func,
  onlyFolders: PropTypes.bool,
};

export default withTranslation()(Root);

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
    _id: "1",
    type: {
      _id: 257,
      name: "Root",
      icon: "archive",
    },
  };

  componentDidMount = async () => {
    const { rootElement, props } = this;
    const { getChildren, onSelect } = props;

    onSelect(rootElement);
    getChildren(rootElement._id);
  };

  render() {
    const { props, rootElement } = this;
    const { selectedId, onSelect, elements } = props;
    const { _id } = rootElement;
    initT(this.props.t, "treeView");

    const children = findByParentId(_id, elements);

    return (
      <li key={_id} className={style.root}>
        <div
          onClick={() => onSelect(rootElement)}
          className={join([
            style["archive-icon"],
            _id === selectedId && style.selected,
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
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onlyFolders: PropTypes.bool,
};

export default withTranslation()(Root);

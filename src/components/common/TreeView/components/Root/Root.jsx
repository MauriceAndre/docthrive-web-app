import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { join } from "../../../../../utils/arrayUtils";
import { initT, t } from "../../../../../utils/intl";
import { renderChild } from "./../../utility";
import style from "./../../TreeView.module.css";

class Root extends Component {
  state = {
    children: [],
  };

  rootId = 1;

  componentDidMount = async () => {
    const children = await this.props.getChildren(this.rootId);
    this.setState({ children });
  };

  render() {
    const { rootId, props, state } = this;
    const { selectedId, onSelect } = props;
    const { children } = state;
    initT(this.props.t, "treeView");

    return (
      <li key={rootId} className={style.root}>
        <div
          onClick={() => onSelect({ id: rootId })}
          className={join([
            style["archive-icon"],
            rootId === selectedId && style.selected,
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
  selectedId: PropTypes.object,
  onSelect: PropTypes.func,
  getChildren: PropTypes.func,
};

export default withTranslation()(Root);

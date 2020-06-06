import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "react-bootstrap";
import Icon from "./../../../Icon";
import { join } from "../../../../../utils/arrayUtils";
import {
  findByParentId,
  getRootElement,
} from "../../../../../utils/elementUtils";
import { renderChild } from "./../../utility";
import style from "./../../TreeView.module.css";

const Root = (props) => {
  const {
    selectedId,
    onSelect,
    elements,
    loadingId,
    getChildren,
    onContextMenu,
  } = props;
  const rootElement = props.rootElement || getRootElement();
  const { _id, name, type } = rootElement;
  const isSelected = _id === selectedId;
  const loading = loadingId === _id;

  useEffect(() => {
    getChildren(rootElement._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const children = findByParentId(_id, elements);

  return (
    <li key={_id} className={style.root}>
      <div
        onClick={() => onSelect(rootElement)}
        onContextMenu={(e) => onContextMenu(e, rootElement)}
        className={join([style["root-li"], isSelected && style.selected])}
      >
        <Icon name={type.icon} text={name} />
        {loading && (
          <Spinner
            className="ml-1"
            animation="border"
            variant="secondary"
            size="sm"
          />
        )}
      </div>
      <ul>{children.map((child) => renderChild(child, { props }))}</ul>
    </li>
  );
};

Root.propTypes = {
  getChildren: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  loadingId: PropTypes.number,
  rootElement: PropTypes.object,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onlyFolders: PropTypes.bool,
  onContextMenu: PropTypes.func,
};

export default Root;

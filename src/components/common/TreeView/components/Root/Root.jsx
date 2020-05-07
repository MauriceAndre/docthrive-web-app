import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { join } from "../../../../../utils/arrayUtils";
import {
  findByParentId,
  getRootElement,
} from "../../../../../utils/elementUtils";
import { renderChild } from "./../../utility";
import style from "./../../TreeView.module.css";

const Root = (props) => {
  const { selectedId, onSelect, elements, getChildren, onContextMenu } = props;
  const rootElement = getRootElement();
  const { _id, name } = rootElement;

  useEffect(() => {
    onSelect(rootElement);
    getChildren(rootElement._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const children = findByParentId(_id, elements);

  return (
    <li key={_id} className={style.root}>
      <div
        onClick={() => onSelect(rootElement)}
        onContextMenu={(e) => onContextMenu(e, rootElement)}
        className={join([
          style["archive-icon"],
          _id === selectedId && style.selected,
        ])}
      >
        {name}
      </div>
      <ul>{children.map((child) => renderChild(child, { props }))}</ul>
    </li>
  );
};

Root.propTypes = {
  getChildren: PropTypes.func.isRequired,
  elements: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onlyFolders: PropTypes.bool,
  onContextMenu: PropTypes.func,
};

export default Root;

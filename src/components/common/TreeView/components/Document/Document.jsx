import React from "react";
import PropTypes from "prop-types";
import { join } from "../../../../../utils/arrayUtils";
import style from "../../TreeView.module.css";

const Document = ({ element, selectedId, onSelect, onContextMenu }) => {
  const { _id, name } = element;

  return (
    <li className={style.document}>
      <div
        onClick={() => onSelect(element)}
        onContextMenu={(e) => onContextMenu(e, element)}
        className={join([
          style["document-icon"],
          selectedId === _id && style.selected,
        ])}
      >
        <span>{name}</span>
      </div>
    </li>
  );
};

Document.propTypes = {
  element: PropTypes.object.isRequired,
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default Document;

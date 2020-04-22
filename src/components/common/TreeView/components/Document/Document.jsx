import React from "react";
import PropTypes from "prop-types";
import { join } from "../../../../../utils/arrayUtils";
import style from "../../TreeView.module.css";

const Document = ({ element, selectedId, onSelect }) => {
  const { id, name } = element;

  return (
    <li className={style.document}>
      <div
        onClick={() => onSelect(element)}
        className={join([
          style["document-icon"],
          selectedId === id && style.selected,
        ])}
      >
        <span>{name}</span>
      </div>
    </li>
  );
};

Document.propTypes = {
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
};

export default Document;

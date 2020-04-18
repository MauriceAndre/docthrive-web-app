import React from "react";
import PropTypes from "prop-types";
import { join } from "./../../../../../utils/arrayUtils";
import style from "../../TreeView.module.css";

const File = ({ element, selectedId, onSelect }) => {
  const { id, name } = element;

  return (
    <li className={style.file}>
      <div
        onClick={() => onSelect(element)}
        className={join([
          style["file-icon"],
          selectedId === id && style.selected,
        ])}
      >
        <span>{name}</span>
      </div>
    </li>
  );
};

File.propTypes = {
  selectedId: PropTypes.string,
  onSelect: PropTypes.func,
};

export default File;

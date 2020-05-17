import React from "react";
import PropTypes from "prop-types";
import Icon from "./../../../Icon";
import { join } from "../../../../../utils/arrayUtils";
import style from "../../TreeView.module.css";

const Document = ({ element, selectedId, onSelect, onContextMenu }) => {
  const { _id, name, type } = element;
  const isSelected = selectedId === _id;

  const iconStyle = {
    color: isSelected ? "white" : type.color,
  };

  return (
    <li className={style.document}>
      <div
        onClick={() => onSelect(element)}
        onContextMenu={(e) => onContextMenu(e, element)}
        className={join([style["document-li"], isSelected && style.selected])}
      >
        <Icon name={type.icon} text={name} style={iconStyle} />
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

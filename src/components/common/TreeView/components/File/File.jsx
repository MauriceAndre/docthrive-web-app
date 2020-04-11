import React, { Component } from "react";
import PropTypes from "prop-types";
import { join } from "./../../../../../utils/arrayUtils";
import style from "../../TreeView.module.css";

class File extends Component {
  state = {};

  render() {
    const { element, selectedId, onSelect } = this.props;
    const { id, name } = element;

    return (
      <li key={id} className={style.file}>
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
  }
}

File.propTypes = {
  selectedId: PropTypes.object,
  onSelect: PropTypes.func,
};

export default File;

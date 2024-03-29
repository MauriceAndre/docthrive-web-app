import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import Icon from "./../Icon";
import { isString } from "./../../../utils/stringUtils";
import style from "./ContextMenu.module.css";

function ContextMenu({ title, items, x, y }) {
  var myStyle = {
    top: `${y}px`,
    left: `${x + 5}px`,
  };

  return (
    <ListGroup style={myStyle} className={style["context-menu"]}>
      {title && (
        <ListGroup.Item key="header" disabled className={style.header}>
          {title}
        </ListGroup.Item>
      )}
      {items.map(({ key, content, icon, text, isDisabled, onClick }) => {
        const iconProps = isString(icon) ? { name: icon } : { ...icon };

        return (
          <ListGroup.Item
            key={key}
            action
            disabled={isDisabled}
            onClick={onClick}
          >
            {content ? content : <Icon key={key} text={text} {...iconProps} />}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

ContextMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default ContextMenu;

import React from "react";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";
import style from "./FloatingButton.module.css";
import { join } from "./../../../utils/arrayUtils";

const FloatingButton = ({
  text,
  icon,
  bottom,
  top,
  left,
  right,
  className,
  variant,
  ...rest
}) => {
  const position = [
    bottom && style["bottom"],
    top && style["top"],
    left && style["left"],
    right && style["right"],
  ];
  const content = [
    <span className={style["btn-text"]}>{text}</span>,
    " ",
    <FontAwesome name={icon} />,
  ];

  return (
    <Button
      variant={variant || "primary"}
      className={join(["shadow", style.btn, ...position, className])}
      {...rest}
    >
      {(left && content.reverse()) || content}
    </Button>
  );
};

FloatingButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  bottom: PropTypes.bool,
  top: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.string,
};

export default FloatingButton;

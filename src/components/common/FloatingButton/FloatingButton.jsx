import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import FloatingGroupComp from "./FloatingGroup";
import Icon from "./../Icon";
import { join } from "./../../../utils/arrayUtils";
import { generateKey } from "./../../../utils/componentUtils";
import style from "./FloatingButton.module.css";

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
    <span
      key={generateKey("float_btn_text", icon, true)}
      className={style["btn-text"]}
    >
      {text}
    </span>,
    " ",
    <Icon key={generateKey("float_btn_icon", icon, true)} name={icon} />,
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

export const FloatingGroup = FloatingGroupComp;

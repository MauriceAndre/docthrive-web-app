import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Icon({ name, text, left, right, ...rest }) {
  let content = [
    <FontAwesomeIcon key="icon" icon={name} {...rest} />,
    " ",
    <span key={"text"}>{text}</span>,
  ];

  if (!name) content.splice(0, 2);

  if (text) {
    content = left ? content.reverse() : content;
  } else {
    content = content[0];
  }

  return content;
}

Icon.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default Icon;

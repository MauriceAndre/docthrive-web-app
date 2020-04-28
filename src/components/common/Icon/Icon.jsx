import React from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

function Icon({ name, text, left, right, ...rest }) {
  let content = [
    name ? (
      <FontAwesome key={"icon"} name={name} {...rest} />
    ) : (
      <span {...rest}></span>
    ),
    " ",
    <span key={"text"}>{text}</span>,
  ];

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

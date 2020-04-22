import React from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

function Icon({ text, left, right, ...rest }) {
  let content = [<FontAwesome {...rest} />, " ", <span>{text}</span>];

  if (text) {
    content = left ? content.reverse() : content;
  } else {
    content = content[0];
  }

  return content;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default Icon;

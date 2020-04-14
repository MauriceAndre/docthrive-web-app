import React from "react";
import FontAwesome from "react-fontawesome";
import PropTypes from "prop-types";

function Icon(props) {
  return <FontAwesome {...props} />;
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;

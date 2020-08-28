import React from "react";
import PropTypes from "prop-types";
import { join } from "./../../../../utils/arrayUtils";
import style from "./DotLoader.module.css";

function DotLoader({ text, className, ...rest }) {
  return (
    <div className={join([className, style.loading])} {...rest}>
      {text}
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}

DotLoader.proptTypes = {
  text: PropTypes.string.isRequired,
};

export default DotLoader;

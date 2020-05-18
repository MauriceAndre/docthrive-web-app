import React from "react";
import PropTypes from "prop-types";
import { toArray, join } from "../../../utils/arrayUtils";
import style from "./FloatingButton.module.css";

function FloatingGroup({ bottom, top, left, right, children }) {
  children = toArray(children);

  const position = [
    bottom && style["bottom"],
    top && style["top"],
    left && style["left"],
    right && style["right"],
  ];

  children = children.map((child) => {
    return React.cloneElement(child, {
      style: { position: "initial", marginLeft: "10px", ...child.props.style },
    });
  });

  return (
    <div className={join(["position-absolute", ...position])}>{children}</div>
  );
}

FloatingGroup.propTypes = {
  bottom: PropTypes.bool,
  top: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default FloatingGroup;

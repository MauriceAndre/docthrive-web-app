import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Radium, { StyleRoot } from "radium";
import { join } from "./../../../utils/arrayUtils";
import style from "./Sidebar.module.css";

function Sidebar({
  show,
  header,
  body,
  footer,
  close,
  animationIn,
  animationOut,
  animationDuration,
  onClose,
  left,
  right,
}) {
  const render = show !== undefined;

  const myStyle = useMemo(() => {
    const animation =
      animationIn && animationOut
        ? {
            animation: `x ${animationDuration}s`,
            animationName: show
              ? Radium.keyframes(animationIn, "animationIn")
              : Radium.keyframes(animationOut, "animationOut"),
            animationFillMode: "forwards",
          }
        : {};

    return {
      backgroundColor: "white",
      right: right ? 0 : "initial",
      left: left ? 0 : "initial",
      zIndex: 1,
      ...animation,
    };
  }, [show, left, right, animationIn, animationOut, animationDuration]);

  return (
    render && (
      <div>
        {show && <div onClick={onClose} className={style.background}></div>}
        <StyleRoot>
          <div style={myStyle} className={style.sidebar}>
            <div className="section">
              <div className="section-wrapper">
                <div className={style.header}>
                  {header}
                  {close && (
                    <button
                      type="button"
                      className={join(["close", style.close])}
                      onClick={onClose}
                    >
                      <span aria-hidden="true">×</span>
                      <span className="sr-only">Close</span>
                    </button>
                  )}
                </div>
                <div className={style.body}>{body}</div>
                <div className={style.footer}>{footer}</div>
              </div>
            </div>
          </div>
        </StyleRoot>
      </div>
    )
  );
}

Sidebar.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.object,
  body: PropTypes.object,
  footer: PropTypes.object,
  close: PropTypes.bool,
  animationIn: PropTypes.object,
  animationOut: PropTypes.object,
  animationDuration: PropTypes.number,
  onClose: PropTypes.func,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default Sidebar;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import Iframe from "react-iframe";
import FloatingButton from "../../../common/FloatingButton";
import { useT, initT, t } from "../../../../utils/intl";

function DocumentContent({ element, workVersion, getWorkVersion }) {
  initT(useT(), "documentContent");
  const url = workVersion && workVersion.url;
  const previewUrl = `https://docs.google.com/gview?url=${url}`;

  useEffect(() => {
    getWorkVersion(element.id);
  }, [element.id, getWorkVersion]);

  const handleClick = () => {
    var win = window.open(previewUrl, "_blank");
    if (win != null) win.focus();
  };

  return (
    (url && (
      <div className="h-100">
        <FloatingButton
          text={t("fullscreen")}
          icon="expand-alt"
          top
          left
          onClick={handleClick}
        />
        <Iframe
          src={`${previewUrl}&embedded=true&loop=true&widget=true`}
          height="100%"
          width="100%"
        />
      </div>
    )) ||
    null
  );
}

const mapStateToProps = ({ archive }) => {
  return {
    workVersion: archive.workVersion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWorkVersion: (elementId) =>
      dispatch(actionCreators.getWorkVersion(elementId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentContent);

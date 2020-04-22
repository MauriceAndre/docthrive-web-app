import React from "react";
import { connect } from "react-redux";
import Iframe from "react-iframe";
import FloatingButton from "../../../common/FloatingButton/FloatingButton";
import { useT, initT, t } from "../../../../utils/intl";

function DocumentContent({ workVersion }) {
  initT(useT(), "documentContent");
  const url = workVersion && workVersion.url;
  const previewUrl = `https://docs.google.com/gview?url=${url}`;

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

const mapStateToProps = (state) => {
  return {
    workVersion: state.archive.workVersion,
  };
};

export default connect(mapStateToProps)(DocumentContent);

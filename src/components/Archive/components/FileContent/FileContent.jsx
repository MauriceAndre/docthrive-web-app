import React from "react";
import { connect } from "react-redux";
import Iframe from "react-iframe";
import FloatingButton from "./../../../common/FloatingButton";
import { useT, initT, t } from "./../../../../utils/intl";

function FileContent({ workVersion }) {
  initT(useT(), "fileContent");
  const url = workVersion && workVersion.url;

  return (
    (url && (
      <div className="h-100">
        <FloatingButton text={t("fullscreen")} icon="expand-alt" top left />
        <Iframe
          src={`https://docs.google.com/gview?url=${url}&embedded=true&loop=true&widget=true`}
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

export default connect(mapStateToProps)(FileContent);

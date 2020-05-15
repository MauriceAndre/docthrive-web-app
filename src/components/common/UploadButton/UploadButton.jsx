import React, { useMemo, Fragment } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../store/actions/index";
import { useDropzone } from "react-dropzone";
import { join } from "./../../../utils/arrayUtils";
import { initT, useT, t } from "../../../utils/intl";
import { uploadDocuments } from "../../ModalHandler/actions";
import style from "./UploadButton.module.css";

function UploadButton({ setModal }) {
  initT(useT(), "uploadButton");

  const onDrop = (files) => {
    console.log(files);
    setModal(uploadDocuments(files));
  };

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  const dropzoneStyle = useMemo(
    () =>
      (isDragAccept && style["drag-accept"]) ||
      (isDragReject && style["drag-reject"]),
    [isDragAccept, isDragReject]
  );

  return (
    <Fragment>
      {/* <ProgressBar
        variant="primary"
        animated
        now={90}
        label={`${90}%`}
        style={{ height: "2rem" }}
      /> */}
      <div
        {...getRootProps({
          className: join([
            "btn btn-sm btn-outline-primary",
            style["upload-btn"],
            dropzoneStyle,
          ]),
        })}
      >
        <input {...getInputProps()} />
        <span>{t("label")}</span>
      </div>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (modal) => dispatch(actionCreators.setModal(modal)),
  };
};

export default connect(null, mapDispatchToProps)(UploadButton);

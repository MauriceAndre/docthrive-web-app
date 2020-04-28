import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { join } from "./../../../utils/arrayUtils";
import { initT, useT, t } from "../../../utils/intl";
import style from "./Dropzone.module.css";
import PropTypes from "prop-types";

function Dropzone({ size, className, onDrop }) {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  initT(useT(), "dropzone");

  const dropzoneStyle = useMemo(
    () =>
      (isDragAccept && style["drag-accept"]) ||
      (isDragReject && style["drag-reject"]),
    [isDragAccept, isDragReject]
  );

  size = size || "md";
  const sizeStyle = style[`dropzone-${size}`];

  return (
    <div
      {...getRootProps({
        className: join([style.dropzone, sizeStyle, dropzoneStyle, className]),
      })}
    >
      <input {...getInputProps()} />
      <span>{t("desc")}</span>
    </div>
  );
}

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  size: PropTypes.string,
};

export default Dropzone;

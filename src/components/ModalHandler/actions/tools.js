import React, { Fragment } from "react";
import store from "./../../../store";
import * as actionCreators from "./../../../store/actions/index";
import { Button } from "react-bootstrap";
import MoveElement from "../Modals/MoveElement/MoveElement";
import CopyElement from "./../Modals/CopyElement/CopyElement";
import CreateFolder from "./../Modals/CreateFolder/CreateFolder";
import UploadDocuments from "./../Modals/UploadDocuments/UploadDocuments";
import { t, initT } from "../../../utils/intl";
import { updateObject } from "./../../../utils/objectUtils";
import { formatString } from "../../../utils/templateUtils";
import * as feedback from "./../../../utils/feedback";

export const moveElement = (showModal, srcElement) => {
  let destElement = null;
  initT(null, "moveElement");

  const handleDestElement = (element) => {
    destElement = element;
  };

  const doSubmit = () => {
    store.dispatch(actionCreators.moveElement(srcElement, destElement._id));
    showModal(false);
    feedback.action(
      t("moveElement.feedback.succ", { data: srcElement, useNamespace: false }),
      feedback.TYPE.SUCCESS
    );
  };

  const onClose = () => {
    showModal(false);
  };

  return {
    title: t("title"),
    show: true,
    onClose,
    body: <MoveElement onSelectElement={handleDestElement} />,
    footer: (
      <Fragment>
        <Button variant="secondary" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button variant="primary" onClick={doSubmit} className="ml-auto">
          {t("move")}
        </Button>
      </Fragment>
    ),
    options: {},
  };
};

export const copyElement = (showModal, srcElement) => {
  let destElement, onSubmit;

  initT(null, "copyElement");

  const handleDestElement = (element) => {
    destElement = element;
  };

  const doSubmit = (data) => {
    const element = updateObject(srcElement, data);
    store.dispatch(actionCreators.copyElement(element, destElement._id));
    showModal(false);
    feedback.action(
      t("copyElement.feedback.succ", { data, useNamespace: false }),
      feedback.TYPE.SUCCESS
    );
  };

  const handleInitForm = (onSubmitFnc) => {
    onSubmit = onSubmitFnc;
    return doSubmit;
  };

  const onClose = () => {
    showModal(false);
  };

  return {
    title: t("title"),
    show: true,
    onClose,
    body: (
      <CopyElement
        srcElement={srcElement}
        onSelectElement={handleDestElement}
        onInitForm={handleInitForm}
      />
    ),
    footer: (
      <Fragment>
        <Button variant="secondary" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={(e) => onSubmit(e)}
          className="ml-auto"
        >
          {t("paste")}
        </Button>
      </Fragment>
    ),
    options: {
      size: "lg",
    },
  };
};

export const deleteElement = (showModal, element) => {
  initT(null, "deleteElement");

  const doSubmit = () => {
    store.dispatch(actionCreators.deleteElement(element));
    showModal(false);
    feedback.action(
      t("deleteElement.feedback.succ", { data: element, useNamespace: false }),
      feedback.TYPE.SUCCESS
    );
  };

  const onClose = () => {
    showModal(false);
  };

  return {
    title: t("title"),
    show: true,
    onClose,
    body: (
      <p className="text-center" style={{ fontSize: "1.1rem" }}>
        {formatString(t("description", { data: element }))}
      </p>
    ),
    footer: (
      <Fragment>
        <Button variant="secondary" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button variant="primary" onClick={doSubmit} className="ml-auto">
          {t("delete")}
        </Button>
      </Fragment>
    ),
    options: {
      size: "md",
    },
  };
};

export const createFolder = (showModal, destElementId) => {
  let onSubmit;
  initT(null, "createFolder");

  const doSubmit = (data) => {
    data.parentId = destElementId;
    store.dispatch(actionCreators.createFolder(data));
    showModal(false);
    feedback.action(
      t("createFolder.feedback.succ", { data, useNamespace: false }),
      feedback.TYPE.SUCCESS
    );
  };

  const handleInitForm = (onSubmitFnc) => {
    onSubmit = onSubmitFnc;
    return doSubmit;
  };

  const onClose = () => {
    showModal(false);
  };

  return {
    title: t("title"),
    show: true,
    onClose,
    body: <CreateFolder onInitForm={handleInitForm} />,
    footer: (
      <Fragment>
        <Button variant="secondary" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={(e) => onSubmit(e)}
          className="ml-auto"
        >
          {t("create")}
        </Button>
      </Fragment>
    ),
    options: {
      size: "lg",
    },
  };
};

export const uploadDocuments = (showModal, files) => {
  let onSubmit;
  initT(null, "uploadDocuments");

  const doSubmit = (data, files) => {
    store.dispatch(actionCreators.uploadDocuments(data, files));
    showModal(false);
    feedback.action(
      t("uploadDocuments.feedback.succ", {
        data: { count: files.length },
        useNamespace: false,
      }),
      feedback.TYPE.SUCCESS
    );
  };

  const handleInitForm = (onSubmitFnc) => {
    onSubmit = onSubmitFnc;
    return doSubmit;
  };

  const onClose = () => {
    showModal(false);
  };

  return {
    title: t("title"),
    show: true,
    onClose,
    body: <UploadDocuments onInitForm={handleInitForm} files={files} />,
    footer: (
      <Fragment>
        <Button variant="secondary" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={(e) => onSubmit(e)}
          className="ml-auto"
        >
          {t("upload")}
        </Button>
      </Fragment>
    ),
    options: {
      size: "lg",
    },
  };
};

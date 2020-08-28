import React, { Fragment } from "react";
import store from "./../../../store";
import * as actionCreators from "./../../../store/actions/index";
import { Button } from "react-bootstrap";
import {
  MoveElement,
  CopyElement,
  CreateFolder,
  UploadDocuments,
  RenameElement,
} from "./../Modals/index";
import { t, initT } from "../../../utils/intl";
import { updateObject } from "./../../../utils/objectUtils";
import { formatString } from "../../../utils/templateUtils";
import * as feedback from "./../../../utils/feedback";

const showModal = (show) => store.dispatch(actionCreators.showModal(show));

export const moveElement = (srcElement) => {
  let onSubmit;
  initT(null, "moveElement");

  const doSubmit = (data) => {
    store.dispatch(actionCreators.moveElement(srcElement, data.parentId));
    showModal(false);
    feedback.action(
      t("moveElement.feedback.succ", { data: srcElement, useNamespace: false }),
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
    body: <MoveElement onInitForm={handleInitForm} keys={["parentId"]} />,
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
          {t("move")}
        </Button>
      </Fragment>
    ),
    options: {},
  };
};

export const copyElement = (srcElement) => {
  let onSubmit;

  initT(null, "copyElement");

  const doSubmit = (data) => {
    const element = updateObject(srcElement, data);
    store.dispatch(actionCreators.copyElement(element, data.parentId));
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
    body: <CopyElement srcElement={srcElement} onInitForm={handleInitForm} />,
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

export const deleteElement = (element) => {
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

export const renameElement = (element) => {
  let onSubmit;
  initT(null, "renameElement");

  const doSubmit = (data) => {
    const uElement = updateObject(element, data);
    store.dispatch(
      actionCreators.updateElement(uElement._id, uElement, element)
    );
    showModal(false);
    feedback.action(
      t("renameElement.feedback.succ", { data: uElement, useNamespace: false }),
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
      <RenameElement
        keys={["name"]}
        element={element}
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
          {t("rename")}
        </Button>
      </Fragment>
    ),
    options: {
      size: "md",
    },
  };
};

export const createFolder = (destElementId) => {
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
    body: (
      <CreateFolder onInitForm={handleInitForm} keys={["name", "labels"]} />
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
          {t("create")}
        </Button>
      </Fragment>
    ),
    options: {
      size: "md",
    },
  };
};

export const uploadDocuments = (files) => {
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

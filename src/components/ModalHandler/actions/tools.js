import React, { Fragment } from "react";
import store from "./../../../store";
import * as actionCreators from "./../../../store/actions/index";
import { Button } from "react-bootstrap";
import MoveElement from "../Modals/MoveElement/MoveElement";
import CopyElement from "./../Modals/CopyElement/CopyElement";
import CreateFolder from "./../Modals/CreateFolder/CreateFolder";
import { t, initT } from "../../../utils/intl";
import { updateObject } from "./../../../utils/objectUtils";

export const moveElement = (showModal, onMove) => {
  let destElement = null;
  initT(null, "moveElement");

  const handleDestElement = (element) => {
    destElement = element;
  };

  const onClose = () => {
    showModal(false);
  };
  const onSave = () => {
    onMove(destElement._id);
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
        <Button variant="primary" onClick={onSave} className="ml-auto">
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

export const createFolder = (showModal, destElementId) => {
  let onSubmit;
  initT(null, "createFolder");

  const doSubmit = (data) => {
    data.parentId = destElementId;
    store.dispatch(actionCreators.createFolder(data));
    showModal(false);
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

import React, { Fragment } from "react";
import { t, initT } from "../../../utils/intl";
import { Button } from "react-bootstrap";
import MoveElement from "../Modals/MoveElement/MoveElement";

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
    onMove(destElement.id);
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

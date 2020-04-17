import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { t, initT, useT } from "../../../../utils/intl";
import { Button } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { join } from "./../../../../utils/arrayUtils";
import { isFolder, isFile } from "./../../../../utils/elementUtils";
import { generateKey } from "./../../../../utils/componentUtils";
import { moveElement, copyElement } from "../../../ModalHandler/actions/index";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

const Toolbar = ({
  selectedElement,
  workVersion,
  onMoveElement,
  onCopyElement,
  setModal,
  showModal,
}) => {
  initT(useT(), "toolbar");

  const tools = [
    {
      text: t("move"),
      icon: "arrow-right",
      handleClick: () => {
        const onMove = (parentId) => onMoveElement(selectedElement, parentId);
        setModal(moveElement(showModal, onMove));
      },
    },
    {
      text: t("copy"),
      icon: "copy",
      handleClick: () => {
        const onCopy = (parentId) => onCopyElement(selectedElement, parentId);
        setModal(copyElement(showModal, onCopy));
      },
    },
    {
      text: "Download",
      icon: "file-download",
      handleClick: ({ name }, { url, extension }) => {
        let a = document.createElement("a");
        a.href = url;
        a.download = `${name}.${extension}`;
        a.click();
      },
      isDisabled: () => isFolder(selectedElement),
    },
    {
      text: "Print",
      icon: "print",
      handleClick: () => {},
      isDisabled: () => isFolder(selectedElement),
    },
    {
      text: "View",
      icon: "list",
      classes: "ml-auto",
      handleClick: () => {},
      isDisabled: () => isFile(selectedElement),
    },
  ];

  return (
    <div className={join(["section-content bg-light", style.toolbar])}>
      <div className="section align-items-center justify-content-start">
        {tools.map(({ text, icon, classes, handleClick, isDisabled }) => (
          <Button
            key={generateKey(text, icon, true)}
            variant="light"
            className={join(["mx-2", classes])}
            onClick={() => handleClick(selectedElement, workVersion)}
            disabled={isDisabled && isDisabled()}
          >
            <Icon name={icon} /> {text}
          </Button>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    workVersion: state.archive.workVersion,
    selectedElement: state.archive.selectedElement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMoveElement: (element, parentId) =>
      dispatch(actionCreators.moveElement(element, parentId)),
    onCopyElement: (element, parentId) =>
      dispatch(actionCreators.copyElement(element, parentId)),
    setModal: (modal) => dispatch(actionCreators.setModal(modal)),
    showModal: (show) => dispatch(actionCreators.showModal(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

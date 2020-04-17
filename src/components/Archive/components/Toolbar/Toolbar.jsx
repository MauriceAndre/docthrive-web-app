import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { t, initT, useT } from "../../../../utils/intl";
import { Container, Button } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { join } from "./../../../../utils/arrayUtils";
import { generateKey } from "./../../../../utils/componentUtils";
import { moveElement } from "../../../ModalHandler/actions/index";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

const Toolbar = ({
  selectedElement,
  workVersion,
  onMoveElement,
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
    { text: "Copy", icon: "copy", handleClick: () => {} },
    {
      text: "Download",
      icon: "file-download",
      handleClick: ({ name }, { url, extension }) => {
        let a = document.createElement("a");
        a.href = url;
        a.download = `${name}.${extension}`;
        a.click();
      },
    },
    { text: "Print", icon: "print", handleClick: () => {} },
    { text: "View", icon: "list", classes: "ml-auto", handleClick: () => {} },
  ];

  return (
    <Container className={join(["section-content bg-light", style.toolbar])}>
      <div className="section align-items-center justify-content-start">
        {tools.map(({ text, icon, classes, handleClick }) => (
          <Button
            key={generateKey(text, icon, true)}
            variant="light"
            className={join(["mx-2", classes])}
            onClick={() => handleClick(selectedElement, workVersion)}
          >
            <Icon name={icon} /> {text}
          </Button>
        ))}
      </div>
    </Container>
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
    setModal: (modal) => dispatch(actionCreators.setModal(modal)),
    showModal: (show) => dispatch(actionCreators.showModal(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

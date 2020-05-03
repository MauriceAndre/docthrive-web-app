import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { t, initT, useT } from "../../../../utils/intl";
import { Button, Dropdown } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { join } from "./../../../../utils/arrayUtils";
import { isFolder, isDocument, isRoot } from "./../../../../utils/elementUtils";
import { generateKey } from "./../../../../utils/componentUtils";
import {
  moveElement,
  copyElement,
  createFolder,
} from "../../../ModalHandler/actions/index";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

const Toolbar = ({
  selectedElement,
  workVersion,
  setModal,
  showModal,
  setView,
  activeView,
}) => {
  initT(useT(), "toolbar");

  const tools = [
    {
      text: t("move"),
      icon: "arrow-right",
      handleClick: () => setModal(moveElement(showModal, selectedElement)),
      isDisabled: isRoot(selectedElement),
    },
    {
      text: t("copy"),
      icon: "copy",
      handleClick: () => setModal(copyElement(showModal, selectedElement)),
      isDisabled: isRoot(selectedElement),
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
      isHidden: isFolder(selectedElement),
    },
    {
      text: "Print",
      icon: "print",
      handleClick: () => {},
      isHidden: isFolder(selectedElement),
    },
    {
      text: t("newFolder"),
      icon: "folder-plus",
      handleClick: () => setModal(createFolder(showModal, selectedElement._id)),
      isHidden: isDocument(selectedElement),
    },
    {
      text: t("view.text"),
      icon: activeView.icon,
      type: "dropdown",
      options: {
        activeItem: activeView.key,
        items: [
          { key: "list", text: t("view.options.list"), icon: "list" },
          { key: "grid", text: t("view.options.grid"), icon: "th" },
        ],
      },
      classes: "ml-auto",
      handleClick: (view) => setView(view),
      isDisabled: isDocument(selectedElement),
    },
  ];

  const renderButton = function ({
    text,
    icon,
    classes,
    handleClick,
    isDisabled,
  }) {
    return (
      <Button
        key={generateKey(text, icon, true)}
        variant="light"
        className={join(["mx-2", classes])}
        onClick={() => handleClick(selectedElement, workVersion)}
        disabled={isDisabled}
      >
        <Icon name={icon} />
        <span className="d-none d-md-inline"> {text}</span>
      </Button>
    );
  };

  const renderDropdown = function ({
    text,
    icon,
    classes,
    handleClick,
    isDisabled,
    options,
  }) {
    return (
      <Dropdown
        key={generateKey(text, icon, true)}
        className={join(["mx-2", classes])}
      >
        <Dropdown.Toggle variant="light" disabled={isDisabled}>
          <Icon name={icon} />
          <span className="d-none d-md-inline"> {text}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {options.items.map((item) => {
            const { key, text, icon } = item;
            return (
              <Dropdown.Item
                key={key}
                eventKey={key}
                active={options.activeItem === key}
                onSelect={() => handleClick(item)}
              >
                <Icon name={icon} text={text} />
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div className={join(["section-content bg-light", style.toolbar])}>
      <div className="section align-items-center justify-content-start">
        {tools.map((tool) => {
          if (tool.isHidden) return null;

          switch (tool.type) {
            case "dropdown":
              return renderDropdown(tool);
            default:
              return renderButton(tool);
          }
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    workVersion: archive.workVersion,
    selectedElement: archive.selectedElement,
    activeView: archive.contentView,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (modal) => dispatch(actionCreators.setModal(modal)),
    showModal: (show) => dispatch(actionCreators.showModal(show)),
    setView: (view) => dispatch(actionCreators.setContentView(view)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

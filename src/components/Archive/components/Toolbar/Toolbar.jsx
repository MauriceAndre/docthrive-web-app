import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { getTools } from "./../../tools";
import { t, initT, useT } from "../../../../utils/intl";
import { Button, Dropdown } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { join } from "./../../../../utils/arrayUtils";
import { isDocument } from "./../../../../utils/elementUtils";
import { isString } from "./../../../../utils/stringUtils";
import { generateKey } from "./../../../../utils/componentUtils";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

const Toolbar = ({ selectedElement, workVersion, setView, activeView }) => {
  initT(useT(), "toolbar");

  const tools = getTools(selectedElement);

  const view = {
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
    classes: join([
      "ml-auto",
      isDocument(selectedElement) && "d-none d-md-block",
    ]),
    onClick: (view) => setView(view),
    isDisabled: isDocument(selectedElement),
  };
  tools.push(view);

  const renderButton = function ({ text, icon, classes, onClick, isDisabled }) {
    const iconProps = isString(icon) ? { name: icon } : icon;

    return (
      <Button
        key={generateKey(text, icon, true)}
        variant="light"
        className={join(["mx-2", classes])}
        onClick={() => onClick(selectedElement, workVersion)}
        disabled={isDisabled}
      >
        <Icon {...iconProps} />
        <span className="d-none d-md-inline"> {text}</span>
      </Button>
    );
  };

  const renderDropdown = function ({
    text,
    icon,
    classes,
    onClick,
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
                onSelect={() => onClick(item)}
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
    setView: (view) => dispatch(actionCreators.setContentView(view)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

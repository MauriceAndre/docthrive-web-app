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
import { updateObject } from "./../../../../utils/objectUtils";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

const Toolbar = ({
  selectedElement,
  workVersion,
  setView,
  activeView,
  setSorting,
  activeSorting,
}) => {
  initT(useT(), "toolbar");

  let tools = getTools(selectedElement);

  const moreTools = [
    {
      text: t("sort.text"),
      icon: activeSorting.order.icon,
      type: "dropdown",
      options: {
        activeItems: [activeSorting.key, activeSorting.order.key],
        items: [
          { key: "type._id", text: t("sort.options.type") },
          { key: "name", text: t("sort.options.name") },
          { key: "createdAt", text: t("sort.options.date") },
          { component: Dropdown.Divider },
          {
            key: "asc",
            text: t("sort.options.asc"),
            icon: "sort-amount-up-alt",
            isOrder: true,
          },
          {
            key: "desc",
            text: t("sort.options.desc"),
            icon: "sort-amount-down-alt",
            isOrder: true,
          },
        ],
      },
      classes: join([
        "ml-auto",
        isDocument(selectedElement) && "d-none d-md-block",
      ]),
      onClick: (item) => {
        const order = item.isOrder ? { order: item } : { key: item.key };
        setSorting(updateObject(activeSorting, order));
      },
      isDisabled: isDocument(selectedElement),
    },
    {
      text: t("view.text"),
      icon: activeView.icon,
      type: "dropdown",
      options: {
        activeItems: [activeView.key],
        items: [
          { key: "list", text: t("view.options.list"), icon: "list" },
          { key: "grid", text: t("view.options.grid"), icon: "th" },
        ],
      },
      classes: isDocument(selectedElement) && "d-none d-md-block",
      onClick: (view) => setView(view),
      isDisabled: isDocument(selectedElement),
    },
  ];
  tools = [...tools, ...moreTools];

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
            let component = item.component;

            if (component) {
              const Component = component;
              component = <Component />;
            } else {
              component = (
                <Dropdown.Item
                  key={key}
                  eventKey={key}
                  active={options.activeItems.includes(key)}
                  onSelect={() => onClick(item)}
                >
                  <Icon name={icon} text={text} />
                </Dropdown.Item>
              );
            }

            return component;
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
    activeSorting: archive.contentSorting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setView: (view) => dispatch(actionCreators.setContentView(view)),
    setSorting: (sorting) =>
      dispatch(actionCreators.setContentSorting(sorting)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

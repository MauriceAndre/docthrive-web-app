import React from "react";
import useTools from "./useTools";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { Button, Dropdown } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { join } from "./../../../../utils/arrayUtils";
import { isString } from "./../../../../utils/stringUtils";
import { generateKey } from "./../../../../utils/componentUtils";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

const Toolbar = (props) => {
  const { selectedElement, workVersion } = props;
  const tools = useTools(props);

  const renderButton = function ({ text, icon, classes, onClick, isDisabled }) {
    const iconProps = isString(icon) ? { name: icon } : icon;

    return (
      <Button
        key={generateKey(text, icon, true)}
        variant="light"
        className={join(["mx-1", classes])}
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
        className={join(["mx-1", classes])}
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
              component = <Component key={key} />;
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

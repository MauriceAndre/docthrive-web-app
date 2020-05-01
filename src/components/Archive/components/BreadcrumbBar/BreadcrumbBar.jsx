import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { Breadcrumb } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { join } from "./../../../../utils/arrayUtils";
import { getPath } from "./../../../../utils/elementUtils";
import { getArchiveElementPath } from "./../../../../utils/historyUtils";
import style from "./BreadcrumbBar.module.css";
import "./BreadcrumbBar.css";

function BreadcrumbBar({ selectedElement, elements, setSelectedElement }) {
  const path = getPath(selectedElement, elements);

  const handleLevelUp = () => {
    setSelectedElement(selectedElement.parentId);
  };

  return (
    <div
      className={join([
        "section-content d-flex bg-light unselectable",
        style["breadcrumb-bar"],
      ])}
    >
      <div
        className="d-flex align-items-center m-2 d-xs-block d-lg-none"
        onClick={handleLevelUp}
      >
        <Icon name="arrow-up" />
      </div>
      <Breadcrumb className={style.breadcrumb}>
        {path.map(({ _id, name }, idx) => (
          <Breadcrumb.Item
            key={_id}
            linkAs={Link}
            linkProps={{ to: getArchiveElementPath(_id) }}
            active={path.length - 1 === idx}
          >
            {name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
}

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
    elements: archive.elements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedElement: (id) =>
      dispatch(actionCreators.setSelectedElementById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BreadcrumbBar);

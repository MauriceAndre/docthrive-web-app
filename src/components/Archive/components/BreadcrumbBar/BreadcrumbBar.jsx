import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import { join } from "./../../../../utils/arrayUtils";
import { getPath } from "./../../../../utils/elementUtils";
import style from "./BreadcrumbBar.module.css";
import "./BreadcrumbBar.css";

function BreadcrumbBar({ selectedElement, elements }) {
  const path = getPath(selectedElement, elements);

  return (
    <div
      className={join([
        "section-content bg-light unselectable",
        style["breadcrumb-bar"],
      ])}
    >
      <Breadcrumb className={style.breadcrumb}>
        {path.map(({ _id, name }, idx) => (
          <Breadcrumb.Item
            key={_id}
            linkAs={Link}
            linkProps={{ to: `/archive/${_id}` }}
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

export default connect(mapStateToProps)(BreadcrumbBar);

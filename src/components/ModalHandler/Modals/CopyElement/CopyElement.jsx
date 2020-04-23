import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Row, Col, Container } from "react-bootstrap";
import TreeView from "../../../common/TreeView";
import CopyElementForm from "./CopyElementForm";
import { initT, useT, t } from "../../../../utils/intl";

function CopyElement({
  elements,
  getChildren,
  onSelectElement,
  srcElement,
  onInitForm,
}) {
  const [selectedElement, setSelectedElement] = useState({});

  initT(useT(), "copyElement");

  const handleSelect = (element) => {
    onSelectElement(element);
    setSelectedElement(element);
  };

  const handleGetChildren = (parentId) => {
    getChildren(parentId);
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6}>
          <CopyElementForm srcElement={srcElement} onInitForm={onInitForm} />
        </Col>
        <Col xs={12} md={6}>
          <div className="mb-2">{t("description")}:</div>
          <TreeView
            selectedId={selectedElement._id}
            onSelect={handleSelect}
            getChildren={handleGetChildren}
            elements={elements}
            onlyFolders={true}
          />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChildren: (...params) => dispatch(actionCreators.getChildren(...params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyElement);

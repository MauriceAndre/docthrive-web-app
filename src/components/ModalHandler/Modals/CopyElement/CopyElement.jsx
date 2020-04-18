import React, { useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Container } from "react-bootstrap";
import { initT, useT, t } from "../../../../utils/intl";
import TreeView from "../../../common/TreeView";

function CopyElement({ elements, getChildren, onSelectElement }) {
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
      <div className="d-flex justify-content-center">
        <div className="w-100">
          <div className="mb-2">{t("description")}:</div>
          <TreeView
            selectedId={selectedElement.id}
            onSelect={handleSelect}
            getChildren={handleGetChildren}
            elements={elements}
            onlyFolders={true}
          />
        </div>
      </div>
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

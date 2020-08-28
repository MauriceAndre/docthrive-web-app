import React from "react";
import { connect } from "react-redux";
import Loader from "./../../../common/Loader";
import FolderContent from "./../FolderContent";
import DocumentContent from "./../DocumentContent";
import { isFolder, isDocument } from "./../../../../utils/elementUtils";
const MainContent = ({ selectedElement }) => {
  let content = null;

  if (isFolder(selectedElement)) {
    content = <FolderContent element={selectedElement} />;
  } else if (isDocument(selectedElement)) {
    content = <DocumentContent element={selectedElement} />;
  } else {
    content = <Loader />;
  }

  return <div className="section-content unselectable">{content}</div>;
};

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
  };
};

export default connect(mapStateToProps)(MainContent);

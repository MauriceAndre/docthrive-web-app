import React from "react";
import { connect } from "react-redux";
import FolderContent from "./../FolderContent";
import DocumentContent from "./../DocumentContent";
import { isFolder } from "./../../../../utils/elementUtils";

const MainContent = ({ selectedElement }) => {
  return (
    <div className="section-content unselectable">
      {(isFolder(selectedElement) && (
        <FolderContent element={selectedElement} />
      )) || <DocumentContent element={selectedElement} />}
    </div>
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
  };
};

export default connect(mapStateToProps)(MainContent);

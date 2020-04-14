import React from "react";
import { connect } from "react-redux";
import FolderContent from "./../FolderContent";
import FileContent from "./../FileContent";
import { isFolder } from "./../../../../utils/elementUtils";

const MainContent = ({ selectedElement }) => {
  return (
    <div className="section-content">
      {(isFolder(selectedElement) && (
        <FolderContent element={selectedElement} />
      )) || <FileContent />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedElement: state.archive.selectedElement,
  };
};

export default connect(mapStateToProps)(MainContent);

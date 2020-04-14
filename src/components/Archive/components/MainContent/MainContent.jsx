import React, { Component } from "react";
import { connect } from "react-redux";
import Iframe from "react-iframe";
import FolderContent from "./../FolderContent";
import FloatingButton from "./../../../common/FloatingButton";
import { isFolder } from "./../../../../utils/elementUtils";

class MainContent extends Component {
  renderFileContent() {
    const file =
      "https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_250kB.ppt";

    return (
      <div className="h-100">
        <FloatingButton text="fullscreen" icon="expand-alt" top left />
        <Iframe
          src={`https://docs.google.com/gview?url=${file}&embedded=true&pagenumber=2`}
          height="100%"
          width="100%"
        />
      </div>
    );
  }

  renderFolderContent = async () => {};

  render() {
    const { selectedElement } = this.props;

    return (
      <div className="section-content">
        {(isFolder(selectedElement) && (
          <FolderContent element={selectedElement} />
        )) ||
          this.renderFileContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedElement: state.archive.selectedElement,
  };
};

export default connect(mapStateToProps)(MainContent);

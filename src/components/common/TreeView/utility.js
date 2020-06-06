import React from "react";
import Folder from "./components/Folder/Folder";
import Document from "./components/Document/Document";
import { isFolder } from "./../../../utils/elementUtils";

export function renderChild(element, scope) {
  const {
    getChildren,
    selectedId,
    onSelect,
    elements,
    onlyFolders,
    onContextMenu,
    loadingId,
  } = scope.props;
  let result;
  const props = {
    element,
    selectedId,
    onSelect,
    onContextMenu,
  };

  if (isFolder(element)) {
    // folder
    result = (
      <Folder
        key={element._id}
        getChildren={getChildren}
        elements={elements}
        onlyFolders={onlyFolders}
        loadingId={loadingId}
        {...props}
      />
    );
  } else {
    // document
    if (onlyFolders) return null;
    result = <Document key={element._id} {...props} />;
  }

  return result;
}

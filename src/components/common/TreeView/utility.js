import React from "react";
import Folder from "./components/Folder/Folder";
import File from "./components/File/File";
import { isFolder } from "./../../../utils/elementUtils";

export function renderChild(element, scope) {
  const {
    getChildren,
    selectedId,
    onSelect,
    elements,
    onlyFolders,
  } = scope.props;
  let result;
  const props = {
    element,
    selectedId,
    onSelect,
  };

  if (isFolder(element)) {
    // folder
    result = (
      <Folder
        key={element.id}
        getChildren={getChildren}
        elements={elements}
        onlyFolders={onlyFolders}
        {...props}
      />
    );
  } else {
    // file
    if (onlyFolders) return null;
    result = <File key={element.id} {...props} />;
  }

  return result;
}

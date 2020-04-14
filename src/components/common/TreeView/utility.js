import React from "react";
import Folder from "./components/Folder/Folder";
import File from "./components/File/File";
import { isFolder } from "./../../../utils/elementUtils";

export function renderChild(element, scope) {
  const { getChildren, selectedId, onSelect } = scope.props;
  let result;
  const props = {
    element,
    selectedId,
    onSelect,
  };

  if (isFolder(element)) {
    // folder
    result = <Folder key={element.id} getChildren={getChildren} {...props} />;
  } else {
    // file
    result = <File key={element.id} {...props} />;
  }

  return result;
}

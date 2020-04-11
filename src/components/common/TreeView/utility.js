import React from "react";
import Folder from "./components/Folder/Folder";
import File from "./components/File/File";

export function renderChild(element, scope) {
  const { getChildren, selectedId, onSelect } = scope.props;
  let result;
  const props = {
    element,
    selectedId,
    onSelect,
  };

  if (element.type > 256) {
    // folder
    result = <Folder getChildren={getChildren} {...props} />;
  } else {
    // file
    result = <File {...props} />;
  }

  return result;
}

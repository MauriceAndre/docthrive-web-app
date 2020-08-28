import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import TreeView from "./../../../common/TreeView";
import { getSearchResult } from "../../../../services/searchService";
import { mapping } from "../../../../utils/objectUtils";
import { initT, useT, t } from "../../../../utils/intl";
import { findByName } from "../../../../utils/elementTypeUtils";

function LabelView({ labels }) {
  initT(useT(), "labelSelect.options");
  const rootElement = useMemo(
    () => ({
      _id: "1",
      name: "Labels",
      type: findByName("labels"),
    }),
    []
  );
  const [selectedElement, setSelectedElement] = useState(rootElement);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const initElements = async () => {
      const labelElements = [];

      for (let label of labels) {
        const result = await getSearchResult({
          labels: [label._id],
        });
        label = mapToViewModel(label, rootElement);
        label.badge = result.length;
        labelElements.push(label);
      }
      setElements(labelElements);
    };
    initElements();
  }, [labels, rootElement]);

  const handleGetChildren = (parentId) => {};

  const handleSelect = (element) => setSelectedElement(element);

  return (
    <TreeView
      selectedId={selectedElement._id}
      elements={elements}
      rootElement={rootElement}
      onSelect={handleSelect}
      getChildren={handleGetChildren}
    />
  );
}

const mapToViewModel = (label, rootElement) => {
  return mapping(label, [
    { _id: label.name },
    {
      name: label.custom
        ? label.name
        : t(`labelSelect.options.${label.name}`, { useNamespace: false }),
    },
    { parentId: rootElement._id },
    { type: findByName("label") },
  ]);
};

const mapStateToProps = ({ archive }) => {
  return {
    labels: archive.labels,
  };
};

export default connect(mapStateToProps)(LabelView);

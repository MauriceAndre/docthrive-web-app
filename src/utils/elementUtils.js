import _ from "lodash";
import { t } from "./intl";
import { formatToDate } from "./dateUtils";
import { isArray, isStringArray } from "./arrayUtils";
import * as objectUtils from "./objectUtils";
import * as fileUtils from "./fileUtils";
import config from "./../services/configService";
import store from "./../store";

export function generateId() {
  const identifier = "temp";
  const timeStamp = Date.now().toString();
  const uniqueNo = Math.floor(Math.random() * 1000);

  return [identifier, timeStamp, uniqueNo].join("_");
}

export function getArchiveState() {
  return store.getState().archive;
}

export function getElements() {
  return getArchiveState().elements;
}

export function isSelectedElement(id, selectedElement) {
  selectedElement = selectedElement || getArchiveState().selectedElement || {};

  return selectedElement._id === id;
}

export function createElement(data) {
  let element = {
    _id: generateId(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  return objectUtils.updateObject(element, data);
}

export function copyElement(element, newParentId) {
  const newElement = createElement({
    parentId: newParentId,
  });

  return objectUtils.updateObject(element, newElement);
}

export function getChildren(element, elements) {
  const children = [];

  if (isFolder(element)) {
    const result = findByParentId(element._id, elements);
    result.every((child) => children.push(getChildren(child, elements)));
    children.push(result);
  } else {
    children.push(element);
  }

  return children;
}

export function isFolder(element) {
  element = element || {};
  element.type = element.type || {};
  return element.type._id > 256;
}

export function isDocument(element) {
  element = element || {};
  element.type = element.type || {};
  return element.type._id <= 256;
}

export function isRoot(element) {
  element = element || {};

  return getRootElement()._id === element._id;
}

export function getPath(element, elements) {
  if (objectUtils.isEmpty(element)) return [];

  const rootElement = getRootElement();
  if (isRoot(element)) element = rootElement;

  const path = [element];
  let { parentId } = element;

  while (parentId) {
    if (parentId === rootElement._id) {
      element = rootElement;
    } else {
      element = findById(parentId, elements);
    }
    parentId = element.parentId;

    path.unshift(element);
  }

  return path;
}

export function sort(elements) {
  return _.sortBy(elements, ["type._id", "name"]);
}

export function getRootElement() {
  let root = config.archive.rootElement;

  return objectUtils.updateObject(root, {
    name: t("treeView." + root.name, { useNamespace: false }),
  });
}

export function getRootId() {
  return config.archive.rootElement._id;
}

export function findById(id, elements) {
  elements = elements || getElements();
  const element = elements.find((element) => element._id === id) || {};

  return element;
}

export function findByParentId(parentId, elements) {
  return elements.filter((element) => element.parentId === parentId);
}

export function replaceById(id, element, elements) {
  elements = [...elements];
  var index = _.findIndex(elements, { _id: id });

  elements.splice(index, 1, element);
  return elements;
}

export function removeById(id, elements) {
  elements = elements || getElements();
  elements = elements.filter((element) => element._id !== id);

  return elements;
}

const formatPattern = [
  { key: "name" },
  {
    key: "type",
    format: (type) => t(`elementTypes.${type.name}`, { useNamespace: false }),
  },
  {
    key: "labels",
    format: (labels) =>
      labels &&
      labels
        .map((label) =>
          label.custom
            ? label.name
            : t(`labelSelect.options.${label.name}`, { useNamespace: false })
        )
        .join(", "),
    emptyValue: "-",
  },
  {
    key: "docVersion",
    format: (docVersion) => docVersion && docVersion.version,
    emptyValue: "-",
  },
  {
    key: "createdAt",
    format: formatToDate,
    type: "date",
  },
  {
    key: "updatedAt",
    format: formatToDate,
    type: "date",
  },
];

export function format(element, options = {}) {
  let { pattern } = options;
  pattern = pattern || formatPattern;
  return objectUtils.format(element, pattern, options);
}

export function populate(element, dataset) {
  const pElement = { ...element };

  for (let key in dataset) {
    const data = dataset[key];
    const value = element[key];

    if (isArray(value))
      pElement[key] = data.filter((item) => value.includes(item._id));
    else pElement[key] = data.find((item) => value === item._id);
  }

  return pElement;
}

export function populateWithStore(element, { all, type, labels }) {
  const dataset = {};
  const { archive } = store.getState();

  if (type || all) {
    const key = "type";
    if (_.isNumber(element[key])) dataset[key] = archive.elementTypes;
  }

  if (labels || all) {
    const key = "labels";
    if (isStringArray(element[key])) dataset[key] = archive.labels;
  }

  return populate(element, dataset);
}

export function fileToElement(data, file) {
  const element = createElement({
    type: config.default.types.document,
    ...data,
    name: fileUtils.getName(file),
  });

  return element;
}

import _ from "lodash";
import { t } from "./intl";
import { formatToDate } from "./dateUtils";
import { isArray } from "./arrayUtils";
import * as objectUtils from "./objectUtils";
import config from "./../services/configService";

export function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
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

export function getPath(element, elements) {
  if (objectUtils.isEmpty(element)) return [];

  const path = [element];
  let { parentId } = element;

  while (parentId) {
    if (parentId === "1") {
      element = getRootElement();
      parentId = undefined;
    } else {
      element = findById(parentId, elements);
      parentId = element.parentId;
    }

    path.unshift(element);
  }

  return path;
}

export function getRootElement() {
  let root = config.archive.rootElement;

  return objectUtils.updateObject(root, {
    name: t("treeView." + root.name, false),
  });
}

export function findById(id, elements) {
  return elements.find((element) => element._id === id);
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

const formatPattern = [
  { key: "name" },
  { key: "type", format: (type) => type.name },
  {
    key: "labels",
    format: (labels) =>
      labels &&
      labels
        .map((label) =>
          label.custom
            ? label.name
            : t(`labelSelect.options.${label.name}`, false)
        )
        .join(", "),
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

export function format(element, allKeys, pattern) {
  pattern = pattern || formatPattern;
  return objectUtils.format(element, pattern, allKeys);
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

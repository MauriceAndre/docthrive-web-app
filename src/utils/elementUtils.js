import _ from "lodash";
import { formatToDate } from "./dateUtils";
import * as objectUtils from "./objectUtils";

export function generateId() {
  return Date.now().toString();
}

export function copyElement(element, newParentId) {
  const id = generateId(),
    createdAt = Date.now(),
    updatedAt = Date.now(),
    newElement = objectUtils.updateObject(element, {
      id,
      parentId: newParentId,
      createdAt,
      updatedAt,
    });

  return newElement;
}

export function getChildren(element, elements) {
  const children = [];

  if (isFolder(element)) {
    const result = findByParentId(element.id, elements);
    result.every((child) => children.push(getChildren(child, elements)));
    children.push(result);
  } else {
    children.push(element);
  }

  return children;
}

export function isFolder(element) {
  return element.type > 256;
}

export function isFile(element) {
  return element.type <= 256;
}

export function findById(id, elements) {
  return elements.find((element) => element.id === id);
}

export function findByParentId(parentId, elements) {
  return elements.filter((element) => element.parentId === parentId);
}

export function replaceById(id, element, elements) {
  elements = [...elements];
  var index = _.findIndex(elements, { id });

  elements.splice(index, 1, element);
  return elements;
}

const pattern = [
  { key: "name" },
  { key: "type" },
  {
    key: "labels",
    format: (labels) => labels && labels.join(", "),
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

export function format(element, allKeys) {
  return objectUtils.format(element, pattern, allKeys);
}

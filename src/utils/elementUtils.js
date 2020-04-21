import _ from "lodash";
import { t } from "./intl";
import { formatToDate } from "./dateUtils";
import { isArray } from "./arrayUtils";
import * as objectUtils from "./objectUtils";

export function generateId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}

export function createElement(data) {
  let element = {
    id: generateId(),
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
    const result = findByParentId(element.id, elements);
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
  return element.type.id > 256;
}

export function isFile(element) {
  element = element || {};
  element.type = element.type || {};
  return element.type.id <= 256;
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
      pElement[key] = data.filter((item) => value.includes(item.id));
    else pElement[key] = data.find((item) => value === item.id);
  }

  return pElement;
}

import _ from "lodash";
import { formatToDate } from "./dateUtils";
import * as objectUtils from "./objectUtils";

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

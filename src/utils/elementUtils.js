import { formatToDate } from "./dateUtils";
import * as objectUtils from "./objectUtils";

export function isFolder(element) {
  return element.type > 256;
}

export function isFile(element) {
  return element.type <= 256;
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

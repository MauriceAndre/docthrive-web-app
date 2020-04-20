import _ from "lodash";

export const join = function (arr) {
  return _.compact(arr).join(" ");
};

export const isArray = function (arr) {
  return Array.isArray(arr);
};

export const toArray = function (value) {
  if (value) {
    return isArray(value) ? value : [value];
  }

  return [];
};

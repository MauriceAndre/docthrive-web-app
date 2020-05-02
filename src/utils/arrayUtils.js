import _ from "lodash";
import { isObject } from "./objectUtils";
import { isString } from "./stringUtils";

export const join = function (arr) {
  return _.compact(arr).join(" ");
};

export const isArray = function (arr) {
  return Array.isArray(arr);
};

export const isEmpty = function (arr) {
  return arr.length === 0;
};

export const isStringArray = function (arr) {
  if (isArray(arr)) {
    return arr.lenth > 0 ? isString(arr[0]) : false;
  }
  return false;
};

export const toArray = function (value) {
  if (value) {
    return isArray(value) ? value : [value];
  }

  return [];
};

export const funcIteration = function (arr, funcs) {
  const items = [];

  for (let item of arr) {
    const payload = {};

    for (let funcObj of funcs) {
      let func, params;

      if (isObject(funcObj)) {
        func = funcObj.func;
        params = funcObj.params(item, payload);
      } else {
        params = [item, payload];
        func = funcObj;
      }

      item = func(...params);
    }
    items.push(item);
  }

  return items;
};

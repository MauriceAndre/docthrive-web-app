import _ from "lodash";

export const isString = function (value) {
  return _.isString(value);
};

export const substring = function (str, maxChars, placeholder) {
  return str.length > maxChars
    ? str.substr(0, maxChars - placeholder.length) + placeholder
    : str;
};

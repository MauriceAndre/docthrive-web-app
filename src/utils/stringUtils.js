import _ from "lodash";

export const isString = function (value) {
  return _.isString(value);
};

export const substring = function (str, maxChars, placeholder) {
  return str.length > maxChars
    ? str.substr(0, maxChars - placeholder.length) + placeholder
    : str;
};

export const indexOf = function (str, value) {
  var indices = [];
  const length = value.length;

  for (var i = 0; i < str.length; i++) {
    const section = str.substr(i, length);

    if (section === value) indices.push(i);
  }

  return indices;
};

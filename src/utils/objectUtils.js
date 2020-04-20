export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function format(obj, pattern, allKeys) {
  const formatObj = allKeys ? { ...obj } : {};

  for (let item of pattern) {
    const value = formatKey(obj, item);

    formatObj[item.key] = value;
  }

  return formatObj;
}

export function formatKey(obj, pattern) {
  const { key, format, emptyValue } = pattern;
  let value = obj[key];

  if (format) value = format(value);

  if (emptyValue && !value) value = emptyValue;

  return value;
}

export const mapping = function (object, keys) {
  const obj = {};

  if (typeof keys === "string") keys = keys.split(" ");

  for (let key of keys) {
    let value;

    if (typeof key === "object") {
      const propKey = Object.keys(key)[0];
      value = key[propKey];
      key = propKey;
    } else {
      value = object[key];
    }

    obj[key] = value;
  }

  return obj;
};

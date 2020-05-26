export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isPromise(obj) {
  return obj instanceof Promise;
}

export function isAsyncFunc(obj) {
  return obj.constructor.name === "AsyncFunction";
}

export function format(obj, pattern, options) {
  const { allKeys } = options;

  const formatObj = allKeys ? { ...obj } : {};

  for (let item of pattern) {
    const value = formatKey(obj, item, options);

    formatObj[item.key] = value;
  }

  return formatObj;
}

export function formatKey(obj, pattern, options) {
  let { ignoreEmptyValue } = options;

  const { key, format, emptyValue } = pattern;
  let value = obj[key];

  if (format) value = format(value);

  if (!ignoreEmptyValue && emptyValue && !value) value = emptyValue;

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

export const getProps = function (obj, keys) {
  const props = {};

  if (!keys) return { ...obj };

  for (let key of keys) {
    props[key] = obj[key];
  }

  return props;
};

export const propsToArray = function (obj) {
  const arr = [];

  for (let key in obj) {
    arr.push(obj[key]);
  }

  return arr;
};

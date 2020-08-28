import { isArray } from "./arrayUtils";

const separator = "_";

export function generateKey(id, keys, unique) {
  keys = isArray(keys) ? keys : [keys];
  return [id, ...keys].join(separator) + (unique ? separator + Date.now() : "");
}

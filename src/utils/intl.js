import i18next from "i18next";
import { useTranslation } from "react-i18next";

let tFnc, namespace;

export const useT = useTranslation;

export function initT(trans, ns) {
  tFnc = (trans && trans.t) || trans;
  namespace = ns;
}

export function t(key, useNamespace) {
  useNamespace = useNamespace === undefined ? true : useNamespace;

  if (useNamespace) key = namespace ? `${namespace}.${key}` : key;

  return (tFnc && tFnc(key)) || i18next.t(key);
}

export function setNs(ns) {
  namespace = ns;
}

export default {
  useT,
  initT,
  t,
};

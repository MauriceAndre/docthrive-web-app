import { useTranslation } from "react-i18next";

let tFnc, namespace;

export const useT = useTranslation;

export function initT(trans, ns) {
  tFnc = trans.t || trans;
  namespace = ns;
}

export function t(key, ...rest) {
  key = namespace ? `${namespace}.${key}` : key;

  return tFnc(key, ...rest);
}

export function setNs(ns) {
  namespace = ns;
}

export default {
  useT,
  initT,
  t,
};

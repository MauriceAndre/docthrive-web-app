import i18next from "i18next";
import { useTranslation } from "react-i18next";

let tFnc, namespace;

export const useT = useTranslation;

export function initT(trans, ns) {
  tFnc = (trans && trans.t) || trans;
  namespace = ns;
}

export function t(key, ...rest) {
  key = namespace ? `${namespace}.${key}` : key;

  return (tFnc && tFnc(key, ...rest)) || i18next.t(key, ...rest);
}

export function setNs(ns) {
  namespace = ns;
}

export default {
  useT,
  initT,
  t,
};

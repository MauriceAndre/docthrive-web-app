import * as feedback from "./feedback";
import { isAsyncFunc } from "./objectUtils";

const _catchFunc = function (ex, func) {
  let message = "";

  if (ex.response) message = ex.response.data;
  else message = ex.message;

  feedback.form(message, feedback.TYPE.ERROR);

  func && func(ex);
};

export const trycatch = function ({ try: tryFunc, catch: catchFunc }) {
  if (isAsyncFunc(tryFunc)) {
    tryFunc().catch((ex) => _catchFunc(ex, catchFunc));
  } else {
    try {
      tryFunc();
    } catch (ex) {
      _catchFunc(ex, catchFunc);
    }
  }
};

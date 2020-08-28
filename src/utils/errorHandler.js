import * as feedback from "./feedback";

export const handleCatch = function (ex) {
  let message = "";

  if (ex.response) message = ex.response.data;
  else message = ex.message;

  feedback.form(message, feedback.TYPE.ERROR);
};

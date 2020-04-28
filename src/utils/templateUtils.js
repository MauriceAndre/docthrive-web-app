import Handlebars from "handlebars";

export const template = function (source, data) {
  const tpl = Handlebars.compile(source);

  return tpl(data);
};

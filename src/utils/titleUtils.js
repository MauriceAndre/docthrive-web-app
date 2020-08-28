import config from "./../services/configService";

export const setTitle = function (str) {
  document.title = str;
};

export const setArchiveElement = function (element) {
  const { name } = element;
  setTitle(`${name} - ${config.app.title}`);
};

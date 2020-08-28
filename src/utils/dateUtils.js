import moment from "moment";

export const parseToDateTime = function (date, time) {
  return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
};

export const formatToDate = function (date) {
  return format(date, "DD.MM.YYYY");
};

export const formatToTime = function (date) {
  return format(date, "HH:mm");
};

export const formatToDateTime = function (date) {
  return format(date, "DD.MM.YYYY HH:mm");
};

export const format = function (date, pattern) {
  return date ? moment(new Date(date)).format(pattern) : null;
};

export default {
  parseToDateTime,
  formatToDate,
  formatToTime,
};

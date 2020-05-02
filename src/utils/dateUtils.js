import moment from "moment";

export const parseToDateTime = function (date, time) {
  return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
};

export const formatToDate = function (date) {
  return moment(new Date(date)).format("DD.MM.YYYY");
};

export const formatToTime = function (date) {
  return moment(new Date(date)).format("HH:mm");
};

export const formatToDateTime = function (date) {
  return moment(new Date(date)).format("DD.MM.YYYY HH:mm");
};

export default {
  parseToDateTime,
  formatToDate,
  formatToTime,
};

import _ from "lodash";

export const join = function (arr) {
  return _.compact(arr).join(" ");
};

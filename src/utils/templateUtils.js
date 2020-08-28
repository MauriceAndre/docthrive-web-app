import React from "react";
import Handlebars from "handlebars";
import { indexOf } from "./stringUtils";
import { remove } from "./arrayUtils";

const seperator = {
  start: "<%",
  end: "%>",
  param: " ",
};

export const template = function (source, data) {
  const tpl = Handlebars.compile(source);

  return tpl(data);
};

export const formatString = function (str) {
  let content = [];
  const { start, end, param: paramSep } = seperator;

  if (str.includes(start) && str.includes(end)) {
    const startIdxs = indexOf(str, start);
    const endIdxs = indexOf(str, end);

    if (startIdxs.length === endIdxs.length) {
      let lastIdx = 0;
      const length = startIdxs.length;
      for (let i = 0; i < length; i++) {
        const startIdx = startIdxs[i];
        const endIdx = endIdxs[i];

        const pattern = str.substring(startIdx, endIdx);
        let params = pattern.split(paramSep);
        params = remove(params, { first: true, last: true });
        let [tag, ...value] = params;
        value = value.join(paramSep);

        content.push(str.substring(lastIdx, startIdx));
        content.push(React.createElement(tag, { key: i }, value));

        lastIdx = endIdx + end.length;
      }
      const tail = str.substring(lastIdx, str.length);
      content.push(tail);
    }
  } else {
    content.push(str);
  }

  return content;
};

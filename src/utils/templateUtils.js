import React from "react";
import Handlebars from "handlebars";
import { indexOf } from "./stringUtils";

const seperator = {
  start: "<%",
  end: "%>",
};

export const template = function (source, data) {
  const tpl = Handlebars.compile(source);

  return tpl(data);
};

export const formatString = function (str) {
  let content = [];
  const { start, end } = seperator;

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
        const params = pattern.split(" ");
        const [, tag, value] = params;

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

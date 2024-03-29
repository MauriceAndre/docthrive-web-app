import { formatToDateTime } from "./dateUtils";
import { t, initT } from "./intl";

export const mapToViewModel = ({ _id, action, createdAt }) => {
  const { title, text } = formatAction(action);

  return {
    id: _id,
    title,
    text,
    date: formatToDateTime(createdAt),
  };
};

export const formatAction = ({ name, before, after }) => {
  const key = `elementActions.${name}`;
  const options = { data: { before, after } };

  initT(null, key);

  return { title: t("title", options), text: t("text", options) };
};

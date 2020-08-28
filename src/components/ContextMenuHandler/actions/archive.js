import { getVisibleTools } from "./../../Archive/tools";

export const elementItem = (element) => {
  const items = getVisibleTools(element);
  const title = element.name;

  return { items, title };
};

import { Dropdown } from "react-bootstrap";
import { getTools } from "./../../tools";
import { t, initT, useT } from "../../../../utils/intl";
import { isDocument } from "./../../../../utils/elementUtils";
import { updateObject } from "./../../../../utils/objectUtils";
import { join } from "./../../../../utils/arrayUtils";

export default function ({
  selectedElement,
  activeView,
  setView,
  activeSorting,
  setSorting,
}) {
  initT(useT(), "toolbar");

  const tools = getTools(selectedElement);

  const moreTools = [
    {
      text: t("sort.text"),
      icon: activeSorting.order.icon,
      type: "dropdown",
      options: {
        activeItems: [activeSorting.key, activeSorting.order.key],
        items: [
          { key: "type._id", text: t("sort.options.type") },
          { key: "name", text: t("sort.options.name") },
          { key: "createdAt", text: t("sort.options.date") },
          { key: "divider", component: Dropdown.Divider },
          {
            key: "asc",
            text: t("sort.options.asc"),
            icon: "sort-amount-up-alt",
            isOrder: true,
          },
          {
            key: "desc",
            text: t("sort.options.desc"),
            icon: "sort-amount-down-alt",
            isOrder: true,
          },
        ],
      },
      classes: join([
        "ml-auto",
        isDocument(selectedElement) && "d-none d-md-block",
      ]),
      onClick: (item) => {
        const order = item.isOrder ? { order: item } : { key: item.key };
        setSorting(updateObject(activeSorting, order));
      },
      isDisabled: isDocument(selectedElement),
    },
    {
      text: t("view.text"),
      icon: activeView.icon,
      type: "dropdown",
      options: {
        activeItems: [activeView.key],
        items: [
          { key: "list", text: t("view.options.list"), icon: "list" },
          { key: "grid", text: t("view.options.grid"), icon: "th" },
        ],
      },
      classes: isDocument(selectedElement) && "d-none d-md-block",
      onClick: (view) => setView(view),
      isDisabled: isDocument(selectedElement),
    },
  ];

  return [...tools, ...moreTools];
}

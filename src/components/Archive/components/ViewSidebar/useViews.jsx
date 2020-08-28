import { useState, useEffect, useMemo } from "react";
import TreeView from "./../TreeView";
import LabelView from "./../LabelView";
import { initT, t, useT } from "../../../../utils/intl";

export default function (defaultView) {
  const [view, setView] = useState();
  const [activeKey, setActiveKey] = useState();
  initT(useT(), "archivSidebar");

  const views = useMemo(
    () => [
      {
        key: "labels",
        text: t("views.labels"),
        icon: "tags",
        content: {
          component: LabelView,
        },
      },
      {
        key: "tree",
        text: t("views.tree"),
        icon: "folder",
        content: {
          component: TreeView,
        },
      },
      {
        key: "date",
        text: t("views.date"),
        icon: "calendar-alt",
        content: {},
      },
    ],
    []
  );

  useEffect(() => {
    setView(views.find(({ key }) => key === defaultView));
  }, [views, defaultView]);

  return {
    views,
    view,
    setView,
    activeKey,
    setActiveKey,
  };
}

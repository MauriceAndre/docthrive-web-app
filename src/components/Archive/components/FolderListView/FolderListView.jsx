import React from "react";
import { Table } from "react-bootstrap";
import { t, initT, useT } from "../../../../utils/intl";
import Icon from "../../../common/Icon";
import { format } from "../../../../utils/elementUtils";
import { generateKey } from "../../../../utils/componentUtils";
import style from "./FolderList.module.css";
import DataTableLoader from "../../../common/CustomLoader/DataTableLoader";

function FolderListView({ elements, loading, onSelectElement, onContextMenu }) {
  initT(useT(), "folderListView");

  return loading ? (
    <DataTableLoader className="pl-2" />
  ) : (
    <Table size="sm" striped hover responsive className={style.table}>
      <thead className={style.header}>
        <tr>
          <th className="text-center">{t("type")}</th>
          <th>{t("name")}</th>
          <th>{t("date")}</th>
          <th>{t("labels")}</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((element) => {
          const { name, createdAt, labels, _id } = format(element, {
            allKeys: true,
          });
          const type = element.type;

          return (
            <tr
              key={_id}
              onDoubleClick={() => onSelectElement(element)}
              onContextMenu={(e) => onContextMenu(e, element)}
            >
              <td key={generateKey(_id, "type")} className="w-1 text-center">
                <Icon key={generateKey(_id, "type_icon")} name={type.icon} />
              </td>
              <td key={generateKey(_id, "name")} className="w-5">
                {name}
              </td>
              <td key={generateKey(_id, "date")} className="w-2">
                {createdAt}
              </td>
              <td key={generateKey(_id, "labels")} className="w-4">
                {labels}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default FolderListView;

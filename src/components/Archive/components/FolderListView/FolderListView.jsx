import React from "react";
import { Table } from "react-bootstrap";
import { t, initT, useT } from "../../../../utils/intl";
import Icon from "../../../common/Icon";
import { format } from "../../../../utils/elementUtils";
import { generateKey } from "../../../../utils/componentUtils";
import style from "./FolderList.module.css";

function FolderListView({ elements, onSelectElement }) {
  initT(useT(), "folderListView");

  return (
    <Table size="sm" striped hover responsive className={style.table}>
      <thead className={style.header}>
        <tr>
          <th>{t("type")}</th>
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
            <tr key={_id} onDoubleClick={() => onSelectElement(element)}>
              <td key={generateKey(_id, "type")} className="w-1 align-middle">
                <Icon key={generateKey(_id, "type_icon")} name={type.icon} />
              </td>
              <td key={generateKey(_id, "name")} className="w-5 align-middle">
                {name}
              </td>
              <td key={generateKey(_id, "date")} className="w-2 align-middle">
                {createdAt}
              </td>
              <td key={generateKey(_id, "labels")} className="w-4 align-middle">
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

import React from "react";
import { Table } from "react-bootstrap";
import Icon from "../../../common/Icon/Icon";
import { format } from "../../../../utils/elementUtils";
import { generateKey } from "../../../../utils/componentUtils";
import style from "./FolderList.module.css";

function FolderListView({ elements, onSelectElement }) {
  return (
    <Table size="sm" striped hover responsive className={style.table}>
      <thead className={style.header}>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Date</th>
          <th>Labels</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((element) => {
          const { name, createdAt, labels, id } = format(element, true);
          const type = element.type;

          return (
            <tr key={id} onDoubleClick={() => onSelectElement(element)}>
              <td key={generateKey(id, "type")} className="w-1 align-middle">
                <Icon key={generateKey(id, "type_icon")} name={type.icon} />
              </td>
              <td key={generateKey(id, "name")} className="w-5 align-middle">
                {name}
              </td>
              <td key={generateKey(id, "date")} className="w-2 align-middle">
                {createdAt}
              </td>
              <td key={generateKey(id, "labels")} className="w-4 align-middle">
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

import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Table } from "react-bootstrap";
import Icon from "./../../../common/Icon/Icon";
import { format, findByParentId } from "../../../../utils/elementUtils";
import { generateKey } from "./../../../../utils/componentUtils";
import style from "./FolderContent.module.css";

const FolderContent = ({ onSelectElement, elements, element, getChildren }) => {
  const { id } = element;

  getChildren(id);

  elements = findByParentId(id, elements);

  return (
    <div className="section">
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
                <td
                  key={generateKey(id, "labels")}
                  className="w-4 align-middle"
                >
                  {labels}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectElement: (element) =>
      dispatch(actionCreators.storeSelectedElement(element)),
    getChildren: (parentId) => dispatch(actionCreators.getChildren(parentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderContent);

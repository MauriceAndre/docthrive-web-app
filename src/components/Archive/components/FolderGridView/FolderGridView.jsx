import React from "react";
import { Card } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { generateKey } from "./../../../../utils/componentUtils";
import { join } from "./../../../../utils/arrayUtils";
import style from "./FolderGridView.module.css";

function FolderGridView({ elements, onSelectElement }) {
  return (
    <div className="w-100">
      <div className="d-flex flex-wrap">
        {elements.map((element) => {
          const { name, id, type } = element;

          return (
            <Card
              key={id}
              style={{ height: "3rem", width: "10rem" }}
              className="m-2"
              onDoubleClick={() => onSelectElement(element)}
            >
              <Card.Body className={join(["p-2", style.body])}>
                <Card.Text className={style.text}>
                  <Icon key={generateKey(id, "type_icon")} name={type.icon} />
                  <span> {name}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default FolderGridView;

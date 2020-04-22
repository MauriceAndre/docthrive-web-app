import React from "react";
import { Card } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { generateKey } from "./../../../../utils/componentUtils";
import { join } from "./../../../../utils/arrayUtils";
import style from "./FolderGridView.module.css";
import config from "./../../../../services/configService";

const { maxChars, placeholder } = config.archive.views.grid;

function FolderGridView({ elements, onSelectElement }) {
  return (
    <div className="w-100">
      <div className="d-flex flex-wrap">
        {elements.map((element) => {
          const { name, id, type } = element;
          let text =
            name.length > maxChars
              ? name.substr(0, maxChars - placeholder.length) + placeholder
              : name;

          return (
            <Card
              key={id}
              className={join(["m-1", style.card])}
              onDoubleClick={() => onSelectElement(element)}
            >
              <Card.Body className={join(["p-2", style.body])}>
                <Card.Text className={style.text}>
                  <Icon
                    key={generateKey(id, "type_icon")}
                    name={type.icon}
                    text={text}
                  />
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

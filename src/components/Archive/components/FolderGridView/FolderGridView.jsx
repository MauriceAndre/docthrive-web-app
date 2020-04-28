import React from "react";
import { Card } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import config from "./../../../../services/configService";
import { generateKey } from "./../../../../utils/componentUtils";
import { join } from "./../../../../utils/arrayUtils";
import { substring } from "../../../../utils/stringUtils";
import style from "./FolderGridView.module.css";

const { maxChars, placeholder } = config.archive.views.grid;

function FolderGridView({ elements, onSelectElement }) {
  return (
    <div className="w-100">
      <div className="d-flex flex-wrap">
        {elements.map((element) => {
          const { name, _id, type } = element;
          let text = substring(name, maxChars, placeholder);

          return (
            <Card
              key={_id}
              className={join(["m-1", style.card])}
              onDoubleClick={() => onSelectElement(element)}
            >
              <Card.Body className={join(["p-2", style.body])}>
                <Card.Text className={style.text}>
                  <Icon
                    key={generateKey(_id, "type_icon")}
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

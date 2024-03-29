import React from "react";
import { Card } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import DataGridLoader from "./../../../common/CustomLoader/DataGridLoader";
import config from "./../../../../services/configService";
import { generateKey } from "./../../../../utils/componentUtils";
import { join } from "./../../../../utils/arrayUtils";
import { substring } from "../../../../utils/stringUtils";
import style from "./FolderGridView.module.css";

const { maxChars, placeholder } = config.archive.views.grid;

function FolderGridView({ elements, loading, onSelectElement, onContextMenu }) {
  const loaderColumns = window.innerWidth < 1300 ? 2 : 3;

  return (
    <div className="w-100">
      <div className="d-flex flex-wrap">
        {loading ? (
          <DataGridLoader columns={loaderColumns} />
        ) : (
          elements.map((element) => {
            const { name, _id, type } = element;
            let text = substring(name, maxChars, placeholder);

            return (
              <Card
                key={_id}
                className={style.card}
                onDoubleClick={() => onSelectElement(element)}
                onContextMenu={(e) => onContextMenu(e, element)}
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
          })
        )}
      </div>
    </div>
  );
}

export default FolderGridView;

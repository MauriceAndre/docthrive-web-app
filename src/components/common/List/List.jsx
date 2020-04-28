import React from "react";
import PropTypes from "prop-types";
import { ListGroup } from "react-bootstrap";
import Icon from "./../Icon";
import config from "./../../../services/configService";
import { join } from "./../../../utils/arrayUtils";
import { isString, substring } from "./../../../utils/stringUtils";
import style from "./List.module.css";

const { maxChars, placeholder } = config.components.list;

function List({ items, mapItem, onRemove, ...rest }) {
  return (
    <ListGroup {...rest}>
      {items.map((origItem) => {
        const item = mapItem ? mapItem(origItem) : origItem;
        let { content, key } = item;

        if (isString(content)) {
          content = substring(content, maxChars, placeholder);
        }

        return (
          <ListGroup.Item
            key={key}
            className={join([
              "rounded list-group-item-action my-1",
              style.item,
            ])}
            style={{ height: "2.5rem" }}
          >
            <div className="w-10 p-2">
              <span>{content}</span>
            </div>
            <button
              type="button"
              className={join(["btn w-2", style.delete])}
              onClick={() => onRemove(origItem)}
            >
              <div
                className={join(["position-absolute", style["delete-icon"]])}
              >
                <Icon className="fas fa-trash-alt" />
              </div>
              <div
                className={join(["rounded-right", style["delete-bg"]])}
              ></div>
            </button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  mapItem: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
};

export default List;

import Joi from "joi-browser";
import config from "./../services/configService";
import { getProps } from "./objectUtils";

const { element } = config.validation;

const schemas = {
  element: {
    name: Joi.string()
      .min(element.name.min)
      .max(element.name.max)
      .required()
      .label("Name"),
    labels: Joi.array().label("Labels"),
    parentId: Joi.string().required().label("Destination"),
  },
};

export const getElementSchema = function (keys) {
  let schema = schemas.element;
  schema = keys ? getProps(schema, keys) : schema;

  return schema;
};

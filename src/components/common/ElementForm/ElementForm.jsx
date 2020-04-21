import React from "react";
import Joi from "joi-browser";
import Form from "./../Form";
import config from "./../../../services/configService";
import { initT, t } from "../../../utils/intl";

// config
const elValid = config.validation.element;

class ElementForm extends Form {
  state = {
    data: {
      name: "",
      labels: [],
    },
    errors: {},
  };

  schema = {
    name: Joi.string()
      .min(elValid.name.min)
      .max(elValid.name.max)
      .required()
      .label("Name"),
    labels: Joi.array().label("Labels"),
  };

  render() {
    initT(null, "elementForm");

    return (
      <Form.Container>
        <Form.Input name="name" label={t("name")} scope={this} />
        <Form.LabelSelect
          name="labels"
          label={t("labels")}
          multi
          scope={this}
        />
      </Form.Container>
    );
  }
}

export default ElementForm;

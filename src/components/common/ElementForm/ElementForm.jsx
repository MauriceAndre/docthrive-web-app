import React from "react";
import Form from "./../Form";
import { initT, t } from "../../../utils/intl";
import { getElementSchema } from "./../../../utils/validationUtils";
import { getProps, propsToArray } from "./../../../utils/objectUtils";

class ElementForm extends Form {
  state = {
    data: {},
    errors: {},
  };

  schema = getElementSchema();

  dataProps = {
    name: "",
    labels: [],
  };

  componentWillMount() {
    const { keys } = this.props;
    const data = getProps(this.dataProps, keys);

    this.state.data = data;
  }

  render() {
    const { keys } = this.props;
    initT(null, "elementForm");

    let components = {
      name: (
        <Form.InputGroup
          key="name"
          name="name"
          label={t("name")}
          scope={this}
        />
      ),
      labels: (
        <Form.LabelSelectGroup
          key="labels"
          name="labels"
          label={t("labels")}
          multi
          scope={this}
        />
      ),
    };
    components = getProps(components, keys);

    return <Form.Container>{propsToArray(components)}</Form.Container>;
  }
}

export default ElementForm;

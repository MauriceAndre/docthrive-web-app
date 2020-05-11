import React from "react";
import Form from "./../Form";
import { initT, t } from "../../../utils/intl";
import { getElementSchema } from "./../../../utils/validationUtils";
import { getProps, propsToArray } from "./../../../utils/objectUtils";
import { isEmpty, funcIteration } from "./../../../utils/arrayUtils";

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

  constructor(props) {
    super(props);
    this.firstInput = React.createRef();
  }

  componentDidMount() {
    this.firstInput.current.focus();
  }

  componentWillMount() {
    const { keys } = this.props;
    const data = getProps(this.dataProps, keys);

    this.state.data = data;
  }

  render() {
    const { keys } = this.props;
    initT(null, "elementForm");

    let components = {
      name: {
        tag: Form.InputGroup,
        props: {
          key: "name",
          name: "name",
          label: t("name"),
          scope: this,
        },
      },
      labels: {
        tag: Form.LabelSelectGroup,
        props: {
          key: "labels",
          name: "labels",
          label: t("labels"),
          multi: true,
          scope: this,
        },
      },
    };
    components = propsToArray(getProps(components, keys));

    if (!isEmpty(components)) components[0].props.reference = this.firstInput;

    components = funcIteration(components, [
      ({ tag, props }) => React.createElement(tag, props),
    ]);

    return <Form.Container>{components}</Form.Container>;
  }
}

export default ElementForm;

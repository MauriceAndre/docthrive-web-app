import React from "react";
import { Col } from "react-bootstrap";
import Form from "../../../common/Form";
import { t, initT } from "../../../../utils/intl";
import { getElementSchema } from "./../../../../utils/validationUtils";

class DetailsForm extends Form {
  state = {
    data: {
      name: "",
      labels: [],
    },
    errors: {},
  };

  schema = getElementSchema();

  inputProps = {
    type: { readOnly: true },
    docVersion: { readOnly: true },
    labels: {
      render: (key, { label }) => (
        <Form.LabelSelect name={key} label={label} multi scope={this} />
      ),
    },
    createdAt: { type: "date", readOnly: true },
    updatedAt: { type: "date", readOnly: true },
  };

  componentDidMount() {
    const { onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => {
      const { data } = this.state;
      return doSubmit(data);
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { element, edit } = this.props;

    if (prevProps.edit !== edit && edit) {
      const data = {};

      for (let key in element) {
        const props = this.inputProps[key] || {};

        if (!props.readOnly) data[key] = element[key];
      }

      this.setState({ data });
    }
  }

  renderForm(key, props) {
    const { label, value, type, readOnly, render } = props;
    const { edit } = this.props;

    let content = <span>{value}</span>;
    if (edit && !readOnly) {
      if (render) {
        content = render(key, props);
      } else {
        content = (
          <Form.Input
            size="sm"
            name={key}
            label={label}
            type={type}
            scope={this}
          />
        );
      }
    }

    return (
      <Form.Row key={key} className="my-1">
        <Col xs={12} md={5}>
          <span className="text-muted">{label}</span>
        </Col>
        <Col xs={12} md={7}>
          {content}
        </Col>
      </Form.Row>
    );
  }

  render() {
    const { element } = this.props;
    initT(null, "elementDetails");

    return (
      <Form.Container>
        {Object.keys(element).map((key) => {
          const props = {
            ...this.inputProps[key],
            label: t(key),
            value: element[key],
          };

          return this.renderForm(key, props);
        })}
      </Form.Container>
    );
  }
}

export default DetailsForm;

import React from "react";
import Joi from "joi-browser";
import Form from "./../../../common/Form";
import { mapping } from "./../../../../utils/objectUtils";

class CopyElementForm extends Form {
  state = {
    data: {
      name: "",
      labels: [],
    },
    errors: {},
  };

  doSubmit = null;

  schema = {
    name: Joi.string().required().label("Name"),
    labels: Joi.array().label("Labels"),
  };

  componentDidMount() {
    const { srcElement, onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => doSubmit(this.state.data);

    this.setState({ data: this.mapToViewModel(srcElement) });
  }

  mapToViewModel(element) {
    return mapping(element, ["name", "labels"]);
  }

  render() {
    return (
      <Form.Container>
        <Form.Input name="name" label="Name" scope={this} />
        <Form.LabelSelect name="labels" label="Labels" multi scope={this} />
      </Form.Container>
    );
  }
}

export default CopyElementForm;

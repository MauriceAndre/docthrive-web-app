import React, { Component } from "react";
import Joi from "joi-browser";
import { Form as BootstrapForm } from "react-bootstrap";
import LabelsSelectComp from "../LabelSelect";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    wasValidated: false,
  };

  static Container = BootstrapForm;
  static Group = BootstrapForm.Group;
  static Input = ({ name, label, scope, ...rest }) => {
    const { data, errors } = scope.state;
    const error = errors[name];

    return (
      <BootstrapForm.Group controlId={name}>
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        <BootstrapForm.Control
          name={name}
          value={data[name]}
          placeholder={label}
          onChange={scope.handleChange}
          autoComplete="off"
          {...rest}
        />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </BootstrapForm.Group>
    );
  };
  static LabelSelect = ({ name, label, scope, ...rest }) => {
    const { data, errors } = scope.state;
    const error = errors[name];

    return (
      <BootstrapForm.Group controlId={name}>
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        <LabelsSelectComp
          onChange={(option) =>
            scope.handleChange({ currentTarget: { name, value: option } })
          }
          selectedOption={data[name]}
          {...rest}
        />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </BootstrapForm.Group>
    );
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {}, wasValidated: true });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
}

export default Form;

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
  static Row = BootstrapForm.Row;
  static Group = BootstrapForm.Group;
  static _Input = ({ name, label, scope, reference, ...rest }) => {
    const { data } = scope.state;

    return (
      <BootstrapForm.Control
        name={name}
        value={data[name]}
        placeholder={label}
        onChange={scope.handleChange}
        autoComplete="off"
        ref={reference}
        {...rest}
      />
    );
  };
  static Input = (props) => {
    const { name, scope } = props;
    const { errors } = scope.state;
    const error = errors[name];
    const Input = this._Input;

    return (
      <div>
        <Input {...props} />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </div>
    );
  };
  static InputGroup = (props) => {
    const { name, scope, label } = props;
    const { errors } = scope.state;
    const error = errors[name];
    const Input = this._Input;

    return (
      <BootstrapForm.Group controlId={name}>
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        <Input {...props} />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </BootstrapForm.Group>
    );
  };
  static _LabelSelect = ({ name, label, scope, ...rest }) => {
    const { data } = scope.state;

    return (
      <LabelsSelectComp
        onChange={(option) =>
          scope.handleChange({ currentTarget: { name, value: option } })
        }
        selectedOption={data[name]}
        {...rest}
      />
    );
  };
  static LabelSelect = (props) => {
    const { name, scope } = props;
    const { errors } = scope.state;
    const error = errors[name];
    const LabelSelect = this._LabelSelect;

    return (
      <div>
        <LabelSelect {...props} />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </div>
    );
  };
  static LabelSelectGroup = (props) => {
    const { name, scope, label } = props;
    const { errors } = scope.state;
    const error = errors[name];
    const LabelSelect = this._LabelSelect;

    return (
      <BootstrapForm.Group controlId={name}>
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        <LabelSelect {...props} />
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
    if (errors) return false;

    this.doSubmit();
    return true;
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

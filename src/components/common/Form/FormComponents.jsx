import React, { Component } from "react";
import { Form as BootstrapForm } from "react-bootstrap";
import LabelsSelectComp from "../LabelSelect";
import TreeView from "./../TreeView";

class FormComponents extends Component {
  static Container = BootstrapForm;
  static Row = BootstrapForm.Row;
  static Group = BootstrapForm.Group;
  static Text = BootstrapForm.Text;
  static Label = BootstrapForm.Label;

  // Input
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

  // LabelSelect
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

  // TreeSelect
  static _TreeSelect = ({ name, label, scope, ...rest }) => {
    const { data } = scope.state;

    return (
      <TreeView
        name={name}
        selectedId={data[name]}
        onSelect={(element) =>
          scope.handleChange({ currentTarget: { name, value: element._id } })
        }
        {...rest}
      />
    );
  };
  static TreeSelect = (props) => {
    const { name, scope } = props;
    const { errors } = scope.state;
    const error = errors[name];
    const TreeSelect = this._TreeSelect;

    return (
      <div>
        <TreeSelect {...props} />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </div>
    );
  };
  static TreeSelectGroup = (props) => {
    const { name, scope, label } = props;
    const { errors } = scope.state;
    const error = errors[name];
    const TreeSelect = this._TreeSelect;

    return (
      <BootstrapForm.Group controlId={name}>
        <BootstrapForm.Label>{label}</BootstrapForm.Label>
        <TreeSelect {...props} />
        {error && (
          <BootstrapForm.Text className="text-danger">
            {error}
          </BootstrapForm.Text>
        )}
      </BootstrapForm.Group>
    );
  };
}

export default FormComponents;

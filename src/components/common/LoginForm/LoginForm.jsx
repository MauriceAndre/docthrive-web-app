import React from "react";
import Joi from "joi-browser";
import { withTranslation } from "react-i18next";
import { initT, t } from "../../../utils/intl";
import { connect } from "react-redux";
import * as actionCreators from "./../../../store/actions/index";
import { Button } from "react-bootstrap";
import Form from "../Form";
import { trycatch } from "./../../../utils/errorHandler";
import { login } from "../../../services/authService";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  doSubmit = () => {
    const { email, password } = this.state.data;

    trycatch({
      try: async () => {
        await login(email, password);

        this.props.updateUser();
        window.location = "/archive";
      },
    });
  };

  render() {
    initT(this.props.t, "login");

    return (
      <Form.Container onSubmit={this.handleSubmit}>
        <Form.InputGroup name="email" label={t("email")} scope={this} />
        <Form.InputGroup
          name="password"
          label={t("password")}
          type="password"
          scope={this}
        />
        <div className="d-flex justify-content-end">
          <Button type="submit">{t("submit")}</Button>
        </div>
      </Form.Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () => dispatch(actionCreators.updateUser()),
  };
};

export default connect(null, mapDispatchToProps)(withTranslation()(Login));

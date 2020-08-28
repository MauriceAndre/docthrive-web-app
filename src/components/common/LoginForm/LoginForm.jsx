import React from "react";
import Joi from "joi-browser";
import { withTranslation } from "react-i18next";
import { initT, t } from "../../../utils/intl";
import { connect } from "react-redux";
import * as actionCreators from "./../../../store/actions/index";
import { Button } from "react-bootstrap";
import Form from "../Form";
import Loader from "./../Loader";
import { handleCatch } from "./../../../utils/errorHandler";
import { login } from "../../../services/authService";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
    loading: false,
  };

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  doSubmit = () => {
    const { email, password } = this.state.data;

    const exec = async () => {
      this.setState({ loading: true });
      await login(email, password);

      this.props.updateUser();
      window.location = "/archive";
    };

    exec().catch((ex) => {
      handleCatch(ex);
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading } = this.state;
    const { className, title } = this.props;
    initT(this.props.t, "login");

    return (
      <div className={className}>
        {loading && <Loader />}
        {title && <h1 className="text-center">{t("login")}</h1>}
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () => dispatch(actionCreators.updateUser()),
  };
};

export default connect(null, mapDispatchToProps)(withTranslation()(Login));

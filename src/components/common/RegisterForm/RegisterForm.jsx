import React from "react";
import Joi from "joi-browser";
import { withTranslation } from "react-i18next";
import { initT, t } from "../../../utils/intl";
import { Button } from "react-bootstrap";
import Form from "../Form";
import Loader from "./../Loader";
import { getProps } from "./../../../utils/objectUtils";
import { createUser } from "../../../services/userService";
import { handleCatch } from "./../../../utils/errorHandler";
import * as feedback from "../../../utils/feedback";
import config from "./../../../services/configService";
import { applyOptions } from "../../../utils/validationUtils";

const userConf = config.validation.user;

class Register extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confPassword: "",
    },
    errors: {},
    loading: false,
  };

  schema = {
    firstName: applyOptions(
      Joi.string().label("First Name"),
      userConf.firstName
    ),
    lastName: applyOptions(Joi.string().label("Last Name"), userConf.lastName),
    email: applyOptions(Joi.string().email().label("Email"), userConf.email),
    password: applyOptions(Joi.string().label("Password"), userConf.password),
    confPassword: Joi.string().label("Password"),
  };

  doSubmit = () => {
    const data = this.state.data;
    const { password, confPassword } = data;

    if (password === confPassword) {
      let user = getProps(data, ["firstName", "lastName", "email", "password"]);

      const exec = async () => {
        this.setState({ loading: true });
        user = await createUser(user);
        feedback.form(
          t("register.feedback.succ", { useNamespace: false }),
          feedback.TYPE.SUCCESS
        );

        this.props.history.replace("/");
      };
      exec().catch((ex) => {
        handleCatch(ex);
        this.setState({ loading: false });
      });

      return;
    }

    return { confPassword: "Password has to match with above" };
  };

  render() {
    const { loading } = this.state;
    const { className, title } = this.props;
    initT(this.props.t, "register");

    return (
      <div className={className}>
        {loading && <Loader />}
        {title && <h1 className="text-center">{t("register")}</h1>}
        <Form.Container onSubmit={this.handleSubmit}>
          <Form.InputGroup
            name="firstName"
            label={t("firstName")}
            scope={this}
          />
          <Form.InputGroup name="lastName" label={t("lastName")} scope={this} />
          <Form.InputGroup name="email" label={t("email")} scope={this} />
          <Form.InputGroup
            name="password"
            label={t("password")}
            type="password"
            scope={this}
          />
          <Form.InputGroup
            name="confPassword"
            label={t("confPassword")}
            type="password"
            scope={this}
          />
          <div className="d-flex justify-content-end">
            {/* <Button>{t("return")}</Button> */}
            <Button type="submit">{t("submit")}</Button>
          </div>
        </Form.Container>
      </div>
    );
  }
}

export default withTranslation()(Register);

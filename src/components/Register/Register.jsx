import React from "react";
import Joi from "joi-browser";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "../common/Form";
import { getProps } from "./../../utils/objectUtils";
import { createUser } from "../../services/userService";
import { trycatch } from "./../../utils/errorHandler";
import * as feedback from "../../utils/feedback";
import config from "./../../services/configService";
import { applyOptions } from "../../utils/validationUtils";

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
      trycatch({
        try: async () => {
          user = await createUser(user);
          feedback.form("You are registred! :D", feedback.TYPE.SUCCESS);

          this.props.history.replace("/");
        },
      });

      return;
    }

    return { confPassword: "Password has to match with above" };
  };

  render() {
    return (
      <Container
        fluid
        className="h-100 position-absolute"
        style={{ overflowY: "auto" }}
      >
        <h1 className="text-center my-3">Register</h1>
        <Row className="d-flex justify-content-center">
          <Col sm={9} md={7} lg={5}>
            <Form.Container onSubmit={this.handleSubmit}>
              <Form.InputGroup
                name="firstName"
                label="First Name"
                scope={this}
              />
              <Form.InputGroup name="lastName" label="Last Name" scope={this} />
              <Form.InputGroup name="email" label="Email" scope={this} />
              <Form.InputGroup
                name="password"
                label="Password"
                type="password"
                scope={this}
              />
              <Form.InputGroup
                name="confPassword"
                label="Re-enter Password"
                type="password"
                scope={this}
              />
              <div className="d-flex justify-content-between">
                <Button>Go Back</Button>
                <Button type="submit">Submit</Button>
              </div>
            </Form.Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;

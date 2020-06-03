import React from "react";
import Joi from "joi-browser";
import { connect } from "react-redux";
import * as actionCreators from "./../../store/actions/index";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from "../common/Form";
import * as feedback from "../../utils/feedback";
import { trycatch } from "./../../utils/errorHandler";
import { login } from "../../services/authService";

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
        feedback.form("👋 Welcome back!", feedback.TYPE.SUCCESS);

        this.props.updateUser();
        this.props.history.replace("/");
      },
    });
  };

  render() {
    return (
      <Container
        fluid
        className="h-100 position-absolute"
        style={{ overflowY: "auto" }}
      >
        <h1 className="text-center mt-3">Login</h1>
        <Row className="d-flex justify-content-center my-3">
          <Col sm={9} md={7} lg={5}>
            <Form.Container onSubmit={this.handleSubmit}>
              <Form.InputGroup name="email" label={"Email"} scope={this} />
              <Form.InputGroup
                name="password"
                label={"Password"}
                type="password"
                scope={this}
              />
              <div className="d-flex justify-content-between">
                <Button>{"Go back"}</Button>
                <Button type="submit">{"Submit"}</Button>
              </div>
            </Form.Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: () => dispatch(actionCreators.updateUser()),
  };
};

export default connect(null, mapDispatchToProps)(Login);

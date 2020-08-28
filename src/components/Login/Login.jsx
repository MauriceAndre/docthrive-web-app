import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../common/LoginForm";

function Login() {
  return (
    <Container
      fluid
      className="h-100 position-absolute"
      style={{ overflowY: "auto" }}
    >
      <h1 className="text-center mt-3">Login</h1>
      <Row className="d-flex justify-content-center my-3">
        <Col sm={9} md={7} lg={5}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;

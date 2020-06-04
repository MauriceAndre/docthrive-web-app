import React from "react";
import { initT, t } from "../../utils/intl";
import RegisterForm from "../common/RegisterForm";
import { Container, Row, Col } from "react-bootstrap";
import { useT } from "./../../utils/intl";

function Register() {
  initT(useT(), "register");

  return (
    <Container
      fluid
      className="h-100 position-absolute"
      style={{ overflowY: "auto" }}
    >
      <h1 className="text-center mt-3">{t("register")}</h1>
      <Row className="d-flex justify-content-center my-3">
        <Col sm={9} md={7} lg={5}>
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;

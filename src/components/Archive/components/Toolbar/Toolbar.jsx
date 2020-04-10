import React, { Component } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { join } from "./../../../../utils/arrayUtils";
// import FontAwesome from "react-fontawesome";
import style from "./Toolbar.module.css";
import "./Toolbar.css";

class Toolbar extends Component {
  render() {
    return (
      <Container
        fluid
        className={join(["section-content bg-light", style.toolbar])}
      >
        <Row className="section align-items-center">
          <Col sx={6} className="section-wrapper">
            <div className="section-content">
              <Breadcrumb className={style.breadcrumb}>
                <Breadcrumb.Item href="">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="">Library</Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Col>
          <Col sx={6} className="section-wrapper">
            <div className="section-content">
              {/* <Button className="rounded-circle">
                <FontAwesome name="ellipsis-v" />
              </Button> */}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Toolbar;

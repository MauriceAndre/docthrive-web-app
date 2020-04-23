import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../store/actions/index";
import { Container, Row, Col } from "react-bootstrap";
import MainContent from "./components/MainContent";
import Toolbar from "./components/Toolbar";
import ViewSidebar from "./components/ViewSidebar";
import MetaSidebar from "./components/MetaSidebar";
import BreadcrumbBar from "./components/BreadcrumbBar";
import { join } from "./../../utils/arrayUtils";
import style from "./Archive.module.css";

const Archive = ({ initElementTypes, initLabels }) => {
  useEffect(() => {
    initElementTypes();
    initLabels();
  }, [initElementTypes, initLabels]);

  return (
    <Container fluid className={join(["section-content", style.archive])}>
      <Row className="section">
        <Col
          lg={3}
          className={join([
            "d-none d-lg-block px-0 text-center section-wrapper",
            style["view-sidebar"],
          ])}
        >
          <ViewSidebar />
        </Col>
        <Col className="section-wrapper">
          <Row className="section-content section section-column">
            <Col className={join(["section-wrapper", style.toolbar])}>
              <Toolbar />
            </Col>
            <Col className={join(["section-wrapper", style["breadcrumb-bar"]])}>
              <BreadcrumbBar />
            </Col>
            <Col className="section-wrapper section-fill">
              <Row className="section-content section">
                <Col xs={12} md={8} className="section-wrapper">
                  <MainContent />
                </Col>
                <Col
                  md={4}
                  className="d-none d-md-block bg-light section-wrapper"
                >
                  <MetaSidebar />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    initElementTypes: () => dispatch(actionCreators.getElementTypes()),
    initLabels: () => dispatch(actionCreators.getLabels()),
  };
};

export default connect(null, mapDispatchToProps)(Archive);

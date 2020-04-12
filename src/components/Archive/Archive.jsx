import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import MainContent from "./components/MainContent";
import Toolbar from "./components/Toolbar";
import ViewSidebar from "./components/ViewSidebar";
import MetaSidebar from "./components/MetaSidebar";
import { join } from "./../../utils/arrayUtils";
import { isEmpty } from "./../../utils/objectUtils";
import style from "./Archive.module.css";

class Archive extends Component {
  render() {
    const { selectedElement } = this.props;

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
              <Col className="section-wrapper section-fill">
                <Row className="section-content section">
                  <Col
                    xs={(!isEmpty(selectedElement) && 8) || 12}
                    className="section-wrapper"
                  >
                    <MainContent />
                  </Col>
                  {!isEmpty(selectedElement) && (
                    <Col xs={4} className="bg-light section-wrapper">
                      <MetaSidebar />
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedElement: state.archive.selectedElement,
  };
};

export default connect(mapStateToProps)(Archive);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Iframe from "react-iframe";
import Toolbar from "./components/Toolbar";
import ViewSidebar from "./components/ViewSidebar";
import MetaSidebar from "./components/MetaSidebar";
import FloatingButton from "./../common/FloatingButton";
import { join } from "./../../utils/arrayUtils";
import { getAllElements } from "../../services/elementService";
import style from "./Archive.module.css";

class Archive extends Component {
  state = {
    tree: [],
  };

  componentDidMount = async () => {
    const tree = await getAllElements();
    this.setState({ tree });
  };

  render() {
    const { selectedElement } = this.props;
    const { tree } = this.state;
    const file =
      "https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_250kB.ppt";

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
            <ViewSidebar tree={tree} />
          </Col>
          <Col className="section-wrapper">
            <Row className="section-content section section-column">
              <Col className={join(["section-wrapper", style.toolbar])}>
                <Toolbar />
              </Col>
              <Col className="section-wrapper section-fill">
                <Row className="section-content section">
                  <Col
                    xs={(selectedElement.name && 8) || 12}
                    className="section-wrapper"
                  >
                    <FloatingButton
                      text="fullscreen"
                      icon="expand-alt"
                      top
                      left
                    />
                    <Iframe
                      src={`https://docs.google.com/gview?url=${file}&embedded=true&pagenumber=2`}
                      height="100%"
                      width="100%"
                    />
                  </Col>
                  {selectedElement.name && (
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

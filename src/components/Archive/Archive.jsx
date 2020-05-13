import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../store/actions/index";
import { Container, Row, Col } from "react-bootstrap";
import MainContent from "./components/MainContent";
import Toolbar from "./components/Toolbar";
import ViewSidebar from "./components/ViewSidebar";
import MetaSidebar from "./components/MetaSidebar";
import BreadcrumbBar from "./components/BreadcrumbBar";
import { join } from "./../../utils/arrayUtils";
import { getRootId, getRootElement } from "../../utils/elementUtils";
import style from "./Archive.module.css";

const Archive = ({
  initElementTypes,
  initLabels,
  addRootElement,
  onSelectElement,
  loadFirstLevel,
  selectedElement,
  match,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const preSelectedElementId = useRef();
  const id = useRef();
  const skipSetElement = useRef(false);
  const matchId = match.params.id;

  if (
    preSelectedElementId.current !== matchId &&
    selectedElement._id !== matchId
  ) {
    id.current = matchId;
    skipSetElement.current = false;
  } else if (selectedElement._id !== matchId || id.current !== matchId) {
    id.current = matchId;
    preSelectedElementId.current = id.current;
    skipSetElement.current = true;
  }

  // init archive
  useEffect(() => {
    initElementTypes();
    initLabels();
    addRootElement();
    loadFirstLevel().then(() => setIsInitialized(true));
  }, [initElementTypes, initLabels, loadFirstLevel, addRootElement]);

  // set default selected element
  useEffect(() => {
    if (isInitialized && !id.current) id.current = getRootId();
  }, [isInitialized]);

  // set element
  useEffect(() => {
    if (isInitialized && !skipSetElement.current) {
      onSelectElement(id.current);
      preSelectedElementId.current = id.current;
    }
    // eslint-disable-next-line
  }, [id.current, isInitialized, onSelectElement]);

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
                <Col xs={12} md={8} className="section-wrapper">
                  <Row className="section-content section section-column">
                    <Col
                      className={join([
                        "section-wrapper",
                        style["breadcrumb-bar"],
                      ])}
                    >
                      <BreadcrumbBar />
                    </Col>
                    <Col className="section-wrapper">
                      <MainContent />
                    </Col>
                  </Row>
                </Col>
                <Col
                  md={4}
                  className="d-none d-md-block bg-light section-wrapper"
                >
                  <MetaSidebar element={selectedElement} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initElementTypes: () => dispatch(actionCreators.getElementTypes()),
    initLabels: () => dispatch(actionCreators.getLabels()),
    onSelectElement: (id) =>
      dispatch(actionCreators.setSelectedElementById(id)),
    loadFirstLevel: () => dispatch(actionCreators.getChildren(getRootId())),
    addRootElement: () => dispatch(actionCreators.addElement(getRootElement())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive);

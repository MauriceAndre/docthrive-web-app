import React, { useState } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import ElementDetails from "./../ElementDetails";
import ElementHistory from "./../ElementHistory/ElementHistory";
import FloatingButton from "./../../../common/FloatingButton";
import { initT, useT, t } from "../../../../utils/intl";
import "./MetaSidebar.css";
// import style from "./MetaSidebar.module.css";

function MetaSidebar({ selectedElement }) {
  const defaultTabKey = "details";
  initT(useT(), "metaSidebar");
  const [tabKey, setTabKey] = useState(defaultTabKey);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setTabKey(defaultTabKey);
    setEditing(!editing);
  };

  return (
    <Container className="meta-sidebar section-content">
      <Row className="section section-column">
        <Col className="section-wrapper" style={{ maxHeight: "16%" }}>
          <div className="meta-header section-content p-3">
            <h2 className="font-weight-light">{selectedElement.name}</h2>
          </div>
        </Col>
        <Col className="section-wrapper section-fill">
          <div className="section-content section section-column">
            <Tabs
              fill
              activeKey={tabKey}
              id="meta-tab"
              onSelect={(k) => setTabKey(k)}
            >
              <Tab
                eventKey="details"
                title={t("details")}
                className="section-content"
              >
                <ElementDetails edit={editing} onSubmit={handleEditClick} />
              </Tab>
              <Tab
                eventKey="history"
                title={t("history")}
                disabled={editing}
                className="section-content"
              >
                <ElementHistory />
              </Tab>
            </Tabs>
            <FloatingButton
              text={(editing && "save meta") || "edit meta"}
              variant={editing && "success"}
              icon={(editing && "check") || "pen"}
              bottom
              right
              onClick={handleEditClick}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedElement: state.archive.selectedElement,
  };
};

export default connect(mapStateToProps)(MetaSidebar);

import React, { useState } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import ElementDetails from "./../ElementDetails";
import ElementActivity from "./../ElementActivity";
import { initT, useT, t } from "../../../../utils/intl";
import config from "./../../../../services/configService";
import "./MetaSidebar.css";

const defaultTabKey = config.default.metaSidebar.tabKey;

function MetaSidebar({ selectedElement }) {
  initT(useT(), "metaSidebar");
  const [tabKey, setTabKey] = useState(defaultTabKey);
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setTabKey(defaultTabKey);
    setEditing(!editing);
  };

  const tabs = [
    {
      eventKey: "details",
      content: {
        component: ElementDetails,
        props: {
          edit: editing,
          selectedElement,
          onEditClick: handleEditClick,
        },
      },
      title: t("details"),
      className: "section-content",
    },
    {
      eventKey: "activity",
      content: {
        component: ElementActivity,
        props: {
          selectedElement,
        },
      },
      title: t("activities"),
      disabled: editing,
      className: "section-content",
    },
  ];

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
              {tabs.map(({ eventKey, content, ...tabProps }) => {
                const { component: Component, props } = content;
                const isTabSelected = tabKey === eventKey;

                return (
                  <Tab key={eventKey} eventKey={eventKey} {...tabProps}>
                    {<Component isTabSelected={isTabSelected} {...props} />}
                  </Tab>
                );
              })}
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = ({ archive }) => {
  return {
    selectedElement: archive.selectedElement,
  };
};

export default connect(mapStateToProps)(MetaSidebar);

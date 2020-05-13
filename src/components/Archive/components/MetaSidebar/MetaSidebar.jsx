import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as actionCreators from "./../../../../store/actions/index";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import ElementDetails from "./../ElementDetails";
import ElementActivity from "./../ElementActivity";
import { initT, useT, t } from "../../../../utils/intl";
import { updateObject } from "./../../../../utils/objectUtils";
import * as feedback from "./../../../../utils/feedback";
import config from "./../../../../services/configService";
import "./MetaSidebar.css";

const defaultTabKey = config.default.metaSidebar.tabKey;

function MetaSidebar({ element, updateElement }) {
  initT(useT(), "metaSidebar");
  const [tabKey, setTabKey] = useState(defaultTabKey);
  const [editing, setEditing] = useState(false);
  const [currElement, setCurrElement] = useState(element);
  const refElement = useRef(element);

  useEffect(() => {
    refElement.current = element;
    setCurrElement(element);
  }, [element]);

  const handleEditClick = () => {
    setTabKey(defaultTabKey);
    setEditing(!editing);
  };

  const doSubmit = (data) => {
    const uElement = updateObject(refElement.current, data);
    updateElement(uElement);
    setCurrElement(uElement);
    feedback.action(
      t("elementDetails.feedback.succ", {
        useNamespace: false,
      }),
      feedback.TYPE.SUCCESS
    );
  };

  const tabs = [
    {
      eventKey: "details",
      content: {
        component: ElementDetails,
        props: {
          edit: editing,
          element: currElement,
          onEditClick: handleEditClick,
          doSubmit,
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
          element: currElement,
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
            <h2 className="font-weight-light">{currElement.name}</h2>
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateElement: (element) =>
      dispatch(actionCreators.updateElement(element._id, element)),
  };
};

export default connect(null, mapDispatchToProps)(MetaSidebar);

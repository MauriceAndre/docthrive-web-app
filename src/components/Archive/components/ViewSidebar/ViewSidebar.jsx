import React, { Fragment } from "react";
import useViews from "./useViews";
import { Accordion, Card, ListGroup, Container } from "react-bootstrap";
import Icon from "./../../../common/Icon";
import { t } from "../../../../utils/intl";
import { join } from "./../../../../utils/arrayUtils";
import config from "./../../../../services/configService";
import style from "./ViewSidebar.module.css";

const viewSidebarConf = config.default.viewSidebar;
const viewsKey = viewSidebarConf.viewsKey;
const defaultView = viewSidebarConf.view;

const ViewSidebar = (props) => {
  const { views, view, setView, activeKey, setActiveKey } = useViews(
    defaultView
  );

  const onToggle = (key) => setActiveKey(key);

  const renderView = ({ icon, text, key, content }) => {
    const Component = content.component;

    return (
      <Fragment>
        <Accordion.Toggle
          as={Card.Header}
          eventKey={key}
          className="bg-dark text-white p-2"
          onClick={() => onToggle(key)}
        >
          <Icon name={icon} text={text} />
        </Accordion.Toggle>
        <Accordion.Collapse
          eventKey={key}
          className="section-wrapper section-fill"
        >
          <Card.Body
            className={[
              "overflow-auto section-content p-2",
              style["view-body"],
            ]}
          >
            {Component ? <Component /> : null}
          </Card.Body>
        </Accordion.Collapse>
      </Fragment>
    );
  };

  return view ? (
    <Container className="section-content p-3">
      <Accordion
        activeKey={activeKey}
        defaultActiveKey={view.key}
        className={join(["section section-column", style.accordion])}
      >
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={viewsKey}
            className="bg-dark text-white p-2"
            onClick={() => onToggle(viewsKey)}
          >
            {t("tabs.views")}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={viewsKey}>
            <ListGroup variant="flush">
              {views.map((view) => {
                const { key, icon, text } = view;
                return (
                  <ListGroup.Item
                    key={key}
                    action
                    onClick={() => {
                      setView(view);
                      setActiveKey(key);
                    }}
                  >
                    <Icon name={icon} text={text} />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Accordion.Collapse>
        </Card>
        <Card className="section-wrapper section-fill section section-column">
          {renderView(view)}
        </Card>
      </Accordion>
    </Container>
  ) : null;
};

export default ViewSidebar;

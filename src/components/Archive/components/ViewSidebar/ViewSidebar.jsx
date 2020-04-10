import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/archive";
import { withTranslation } from "react-i18next";
import { Accordion, Card, ListGroup, Container } from "react-bootstrap";
import TreeView from "../../../common/TreeView";
import { initT, t } from "../../../../utils/intl";
import { join } from "./../../../../utils/arrayUtils";
import style from "./ViewSidebar.module.css";

class ViewSidebar extends Component {
  render() {
    const { tree, selectedElement } = this.props;
    initT(this.props.t, "archivSidebar");

    return (
      <Container className="section-content p-3">
        <Accordion
          defaultActiveKey="archive"
          className={join(["section section-column", style.accordion])}
        >
          <Card>
            <Accordion.Toggle
              as={Card.Header}
              eventKey="views"
              className="bg-dark text-white p-2"
            >
              {t("tabs.views")}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="views">
              <ListGroup variant="flush">
                <ListGroup.Item action>{t("views.labels")}</ListGroup.Item>
                <ListGroup.Item action>{t("views.tree")}</ListGroup.Item>
                <ListGroup.Item action>{t("views.date")}</ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
          </Card>
          <Card className="section-wrapper section-fill section section-column">
            <Accordion.Toggle
              as={Card.Header}
              eventKey="archive"
              className="bg-dark text-white p-2"
            >
              {t("views.tree")}
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="archive"
              className="section-wrapper section-fill"
            >
              <Card.Body
                className={[
                  "overflow-auto section-content p-2",
                  style["view-body"],
                ]}
              >
                <TreeView
                  tree={tree}
                  selected={selectedElement}
                  onSelect={this.props.onSelectElement}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedElement: state.archive.selectedElement,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectElement: (element) =>
      dispatch(actionCreators.setSelectedElement(element)),
  };
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ViewSidebar)
);

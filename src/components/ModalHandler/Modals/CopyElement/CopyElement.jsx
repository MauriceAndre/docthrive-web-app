import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions/index";
import { Row, Col } from "react-bootstrap";
import Form from "../../../common/Form";
import { getElementSchema } from "./../../../../utils/validationUtils";
import { initT, t } from "../../../../utils/intl";
import { mapping } from "../../../../utils/objectUtils";

class CopyElement extends Form {
  state = {
    data: {
      name: "",
      labels: [],
      parentId: null,
    },
    errors: {},
  };

  schema = getElementSchema(["name", "labels", "parentId"]);

  componentDidMount() {
    const { srcElement, onInitForm } = this.props;

    const doSubmit = onInitForm(this.handleSubmit);
    this.doSubmit = () => doSubmit(this.state.data);

    this.setState({ data: this.mapToViewModel(srcElement) });
  }

  mapToViewModel(element) {
    return mapping(element, ["name", "labels"]);
  }

  render() {
    const { elements, getChildren, loadingId } = this.props;
    initT(null, "elementForm");

    return (
      <Form.Container>
        <Row>
          <Col xs={12} lg={6}>
            <Row>
              <Col>
                <Form.InputGroup
                  key="name"
                  name="name"
                  label={t("name")}
                  scope={this}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.LabelSelectGroup
                  name="labels"
                  label={t("labels")}
                  multi
                  scope={this}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={6}>
            <Form.TreeSelectGroup
              name="parentId"
              label={t("parentId")}
              getChildren={getChildren}
              elements={elements}
              loadingId={loadingId}
              onlyFolders={true}
              scope={this}
            />
          </Col>
        </Row>
      </Form.Container>
    );
  }
}

const mapStateToProps = ({ archive }) => {
  return {
    elements: archive.elements,
    loadingId: archive.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChildren: (...params) => dispatch(actionCreators.getChildren(...params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyElement);

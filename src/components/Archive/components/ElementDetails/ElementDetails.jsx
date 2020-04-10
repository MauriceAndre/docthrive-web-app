import React, { Component } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { formatToDate } from "../../../../utils/dateUtils";
import { initT, t } from "../../../../utils/intl";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";

class ElementDetails extends Component {
  meta = [
    { label: "name", value: "name" },
    { label: "type", value: "type" },
    {
      label: "labels",
      value: "labels",
      format: (labels) => labels && labels.join(", "),
    },
    {
      label: "createdAt",
      value: "createdAt",
      format: formatToDate,
      type: "date",
    },
    {
      label: "updatedAt",
      value: "updatedAt",
      format: formatToDate,
      type: "date",
    },
  ];

  renderEdit({ label, value, type, render }) {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <Form.Row className="my-1">
          <Col xs={5}>
            <span className="text-muted">{label}</span>
          </Col>
          <Col xs={7}>
            {(render && render({ value, label })) || (
              <Form.Control
                size="sm"
                type={type || "text"}
                placeholder={label}
                value={value}
              />
            )}
          </Col>
        </Form.Row>
      </Form>
    );
  }

  renderDefault({ label, value, format }) {
    const placeholder = "-";

    return (
      <Row className="my-1">
        <Col xs={5}>
          <span className="text-muted">{label}</span>
        </Col>
        <Col xs={7}>
          <span>{(format && format(value)) || value || placeholder}</span>
        </Col>
      </Row>
    );
  }

  render() {
    const { selectedElement, edit } = this.props;
    initT(this.props.t, "elementDetails");

    return (
      <Container>
        {this.meta.map((props) => {
          props = { ...props };
          props.label = t(props.label);
          props.value = selectedElement[props.value];

          return (edit && this.renderEdit(props)) || this.renderDefault(props);
        })}
      </Container>
    );
  }
}

ElementDetails.propTypes = {
  selectedElement: PropTypes.object.isRequired,
  edit: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withTranslation()(ElementDetails);

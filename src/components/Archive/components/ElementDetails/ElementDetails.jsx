import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import FloatingButton from "./../../../common/FloatingButton";
import { Container, Col, Row, Form } from "react-bootstrap";
import { initT, t } from "../../../../utils/intl";
import { format } from "../../../../utils/elementUtils";
import { generateKey } from "./../../../../utils/componentUtils";

class ElementDetails extends Component {
  inputProps = {
    createdAt: { type: "date", readOnly: true },
    updatedAt: { type: "date", readOnly: true },
  };

  renderEdit({ label, value, type, render }) {
    return (
      <Form onSubmit={this.props.onEditClick}>
        <Form.Row className="my-1">
          <Col xs={12} md={5}>
            <span className="text-muted">{label}</span>
          </Col>
          <Col xs={12} md={7}>
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

  renderDefault({ label, value }) {
    return (
      <Row key={generateKey(label, value)} className="my-1">
        <Col xs={12} md={5}>
          <span className="text-muted">{label}</span>
        </Col>
        <Col xs={12} md={7}>
          <span>{value}</span>
        </Col>
      </Row>
    );
  }

  render() {
    const { selectedElement, edit, onEditClick } = this.props;
    initT(this.props.t, "elementDetails");

    const element = format(selectedElement);

    return (
      <Container className="p-3 section-content overflow-auto">
        {Object.keys(element).map((key) => {
          const props = { ...this.inputProps[key] };
          props.label = t(key);
          props.value = element[key];

          return (
            (edit && !props.readOnly && this.renderEdit(props)) ||
            this.renderDefault(props)
          );
        })}
        <FloatingButton
          text={(edit && t("save")) || t("edit")}
          variant={(edit && "success") || ""}
          icon={(edit && "check") || "pen"}
          bottom
          right
          onClick={onEditClick}
        />
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

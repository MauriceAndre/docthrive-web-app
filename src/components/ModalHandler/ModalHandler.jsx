import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

function ModalHandler({ modal }) {
  if (!modal) return null;

  const { title, body, footer, show, onClose, options = {} } = modal;

  return (
    <Modal show={show} onHide={onClose} {...options}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
}

ModalHandler.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  body: PropTypes.object,
  footer: PropTypes.object,
  options: PropTypes.object,
};

const mapStateToProps = ({ app }) => {
  return {
    modal: app.modal,
  };
};

export default connect(mapStateToProps)(ModalHandler);

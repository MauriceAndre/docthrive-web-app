import React, { Component } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import LabelSelect from "../LabelSelect";

class TemplateModal extends Component {
  state = {
    tags: [],
  };

  handleTagChange = (options) => {
    this.setState({ tags: options });
  };

  render() {
    const { handleTagChange } = this;
    const { show, onClose } = this.props;
    const { tags } = this.state;

    return (
      <Modal size="lg" show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Load Template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="template">
                <Form.Label>Template</Form.Label>
                <Form.Control as="select" value="Choose..." custom>
                  <option>Template 1</option>
                  <option>Template 2</option>
                  <option>Template 3</option>
                  <option>Template 4</option>
                  <option>Template 5</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Name" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="tags">
                <Form.Label>Tags</Form.Label>
                <LabelSelect
                  multi
                  creatable
                  selectedOption={tags}
                  onChange={handleTagChange}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TemplateModal;

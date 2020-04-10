import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { formatToDate } from "../../../../utils/dateUtils";
import Section from "../../../common/Section/Section";

class ElementHistory extends Component {
  history = [
    {
      title: "Create",
      text: "You created a new document",
      createdAt: Date.now(),
    },
    {
      title: "Create",
      text: "You created a new document",
      createdAt: Date.now(),
    },
    {
      title: "Create",
      text: "You created a new document",
      createdAt: Date.now(),
    },
    {
      title: "Create",
      text: "You created a new document",
      createdAt: Date.now(),
    },
    {
      title: "Create",
      text: "You created a new document",
      createdAt: Date.now(),
    },
  ];

  render() {
    return (
      <Section className="overflow-auto p-2">
        {this.history.map(({ title, text, createdAt }) => (
          <Card className="my-3">
            <Card.Header className="d-flex align-items-center">
              <span>{title}</span>
              <small className="text-muted ml-auto">
                {formatToDate(createdAt)}
              </small>
            </Card.Header>
            <Card.Body>
              <Card.Text>{text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Section>
    );
  }
}

export default ElementHistory;

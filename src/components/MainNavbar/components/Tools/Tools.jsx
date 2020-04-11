import React, { useState } from "react";
import { Row, Button, Dropdown, Col } from "react-bootstrap";
import TemplateModal from "../../../common/TemplateModal";
import Icon from "./../../../common/Icon";
import { useT, initT, t } from "../../../../utils/intl";
import style from "./Tools.module.css";

function Tools() {
  initT(useT(), "mainNavbar");

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Row className="justify-content-between align-items-center">
      <Col xs={8} md={6} lg={8} className="mb-2 my-md-0">
        <Button
          variant="outline-primary"
          size="sm"
          className={style["upload-btn"]}
          type="submit"
        >
          {t("uploadBtn.label")}
        </Button>
      </Col>
      <Col xs={2} md={3} lg={2} className="mb-2 my-md-0">
        <Button variant="outline-dark" size="sm" type="submit">
          <Icon name="bell" />
        </Button>
      </Col>
      <Col xs={2} md={3} lg={2} className="mb-2 my-md-0">
        <Dropdown alignRight>
          <Dropdown.Toggle size="sm">
            <Icon name="plus" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="text-center">
            <Dropdown.Item onClick={handleShow}>
              {t("newDocDropdown.template")}
            </Dropdown.Item>
            <Dropdown.Item>{t("newDocDropdown.word")}</Dropdown.Item>
            <Dropdown.Item>{t("newDocDropdown.excel")}</Dropdown.Item>
            <Dropdown.Item>{t("newDocDropdown.pp")}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <TemplateModal show={show} onClose={handleClose} />
      </Col>
    </Row>
  );
}

export default Tools;

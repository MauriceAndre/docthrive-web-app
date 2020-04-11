import React from "react";
import { Navbar, Container, Row, Col, Button } from "react-bootstrap";
import Tools from "./components/Tools";
import ProfileDropdown from "./../common/ProfileDropdown";
import SearchBar from "./../common/SearchBar";
import Icon from "./../common/Icon";
import "./MainNavbar.css";
import style from "./MainNavbar.module.css";

function MainNavbar() {
  return (
    <Navbar expand="md" className={["text-center p-1", style.navbar]}>
      <Navbar.Toggle aria-controls="mainNavbar">
        <Icon name="bars" />
      </Navbar.Toggle>
      <Navbar.Collapse id="mainNavbar">
        <Container fluid className="mx-0 px-0">
          <Row className="ustify-content-between align-items-center flex-column flex-column-reverse flex-md-row w-100 m-0">
            <Col md={2} className="d-none d-md-inline text-left">
              <Button className="bg-transparent border-0 p-0 text-dark">
                <Icon name="th-large" size="2x" />
              </Button>
            </Col>
            <Col md={5} lg={6}>
              <SearchBar />
            </Col>
            <Col md={4} lg={3}>
              <Tools />
            </Col>
            <Col md={1} lg={1} className="my-2 my-md-0">
              <ProfileDropdown />
            </Col>
          </Row>
        </Container>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MainNavbar;

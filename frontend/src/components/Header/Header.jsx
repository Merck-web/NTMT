import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Headers() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>НТМТ</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto flex-row">
            <LinkContainer to="/Schedule">
              <Nav.Link>
                <i className="fas fa-user "></i>
                <span className="mx-2">Расписание</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Students">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
                <span className="mx-2">Студенты</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Headers;

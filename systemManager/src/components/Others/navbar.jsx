import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import "./styles.css";
import { Link } from "react-router-dom";

export function NavBar() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
  };
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="md-6 gradient-custom"
    >
      <Container fluid>
        <Link to={"/"} />
        <Navbar.Brand href="/e-commerce/dashboard">
          <img
            src="../images/avataradmin.png"
            width="50"
            height="50"
            className="d-inline-block align-center"
            alt="P11 Tecnología"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/e-commerce/dashboard">Panel de control</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
            placement="center"
          >
            <LinkContainer to="/e-commerce/dashboard">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <Nav.Link href="/e-commerce/consultProduct">Productos</Nav.Link>
            <Nav.Link href="/e-commerce/categories" id="basic-nav-dropdown">Categorías</Nav.Link>
            <Nav.Link href="/e-commerce/order">Ventas</Nav.Link>
            <Nav.Link href="/e-commerce/about">Acerca de...</Nav.Link>
            <Nav.Link className="text-primary" onClick={logout}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
          <Form className="d-flex"></Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
      className="md-6"
      expand="lg"
      sticky="top"
      bg="dark"
    >
      <Container fluid>
        <Link to={"/"} />
        <Navbar.Brand href="/e-commerce/dashboard">
          <img
            src="../images/avataradmin.png"
            width="50"
            height="50"
            className="d-inline-block align-center"
            alt="Nacar"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          className="text-color-white"
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="text-color-white me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px", color: "white" }}
            navbarScroll
            placement="center"
          >
              <Nav.Link className="text-color-white" href="/e-commerce/dashboard">Inicio</Nav.Link>
            <Nav.Link
              className="text-color-white"
              href="/e-commerce/consultProduct"
            >
              Productos
            </Nav.Link>
            <Nav.Link
              className="text-color-white"
              href="/e-commerce/categories"
              id="basic-nav-dropdown"
            >
              Categorías
            </Nav.Link>
            <Nav.Link className="text-color-white" href="/e-commerce/order">
              Ventas
            </Nav.Link>
            <Nav.Link
              className="text-color-white"
              href="/e-commerce/parameters"
            >
              Parámetros
            </Nav.Link>
            <Nav.Link className="text-color-white" href="/e-commerce/help">
              Ayuda
            </Nav.Link>
            <Nav.Link className="text-color-white" href="/e-commerce/about">
              Acerca de...
            </Nav.Link>
            <Nav.Link className="text-success" onClick={logout}>
              Cerrar sesión
            </Nav.Link>
          </Nav>
          <Form className="d-flex"></Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

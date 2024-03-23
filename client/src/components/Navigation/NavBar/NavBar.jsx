import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartWidget from "../CartWidget/CartWidget";
import { Link, NavLink } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../../../services/Products";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleDropdownOpen = () => setDropdownOpen(true);
  const handleDropdownClose = () => setDropdownOpen(false);

  const { data } = useQuery(["categories"], fetchCategories, {
    staleTime: 60000,
  });

  const productsData = useQuery(["products"], fetchProducts, {
    staleTime: 60000,
  });

  const products = productsData.data;

  return (
    <Navbar className="navbar-bg navbar-text fixed-top" expand="lg" onToggle={handleToggle} expanded={isOpen}>
      <Container fluid>
        <Link to={"/"}>
          <img src="/src/images/nacar.ico" width="85px" alt="Nácar" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink onClick={closeMenu} to={"/"} className="nav-link text-center">
              Inicio
            </NavLink>
            <NavDropdown
              title="categorías"
              id="basic-nav-dropdown"
              className="text-center ms-5"
              show={dropdownOpen}
              onMouseEnter={handleDropdownOpen}
              onMouseLeave={handleDropdownClose}
            >
              {data
                ? data.map((data) => (
                    <NavDropdown.Item
                      as={Link}
                      to={`/categories/${data.id}`}
                      className="navbar-bg navbar-text text-center py-2 "
                      key={data.id}
                      onClick={closeMenu}
                    >
                      {data.nombre}
                    </NavDropdown.Item>
                  ))
                : null}
            </NavDropdown>
            <NavLink onClick={closeMenu} to={"/contact"} className="nav-link text-center">
              Contacto
            </NavLink>
            <NavLink onClick={closeMenu} to={"/faq"} className="nav-link text-center">
              FAQ
            </NavLink>
            <NavLink onClick={closeMenu} to={"/aboutus"} className="nav-link text-center">
              Sobre Nosotros
            </NavLink>
          </Nav>
          {/* <SearchWidget placeholder="Buscar Producto" data={products}/> */}
          <div className="d-grid p-2">
            <CartWidget />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

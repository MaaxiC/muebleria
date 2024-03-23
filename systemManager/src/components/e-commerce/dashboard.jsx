import React from "react";
import Item from "../Others/card";
import Footer from "../Others/footer";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";

const logout = () => {
  localStorage.removeItem("user");
  window.location.replace("/");
};

const Vcards = [
  {
    id: 1,
    title: "Productos",
    image: "../images/productos.png",
    link: "/e-commerce/consultProduct",
  },
  {
    id: 2,
    title: "Ventas",
    image: "../images/ordenes.png",
    link: "/e-commerce/order",
  },
  {
    id: 3,
    title: "Categorías",
    image: "../images/categorias.png",
    link: "/e-commerce/categories",
  },
  {
    id: 4,
    title: "Parámetros",
    image: "../images/parametros.png",
    link: "/e-commerce/parameters",
  },
  {
    id: 5,
    title: "Mi página",
    image: "../images/mipagina.png",
    //link:"REDIRECCION A WEB CLIENTE"
  },
  {
    id: 6,
    title: "Ayuda",
    image: "../images/ayuda.png",
    link: "/e-commerce/help",
  },
  {
    id: 7,
    title: "Acerca de...",
    image: "../images/acercade.png",
    link: "/e-commerce/about",
  },
];

export function Dashboard() {
  return (
    <>
      <Container fluid className="text-center">
        <Container className="align-items-center h-100 " centered="true">
          <h1 className="text-center text-color-white my-4">¡Hola de nuevo!</h1>
          <div className="row">
            {Vcards.map((card) => (
              <div className="col-md-3" key={card.id}>
                <Item
                  title={card.title}
                  image={card.image}
                  link={card.link}
                ></Item>
              </div>
            ))}
            <Card
              className="bg-dark p-3 m-3 text-center card-product nav-link text-light"
              style={{
                width: "18rem",
                height: "23rem",
                cursor: "pointer",
                boxShadow:
                  "0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)",
              }}
              onClick={logout}
            >
              <Card.Img
                variant="top"
                src="../images/cerrarsesion.png"
                height="250px"
                style={{ objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>Cerrar Sesión</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </Container>
      <br />
      <Footer />
    </>
  );
}

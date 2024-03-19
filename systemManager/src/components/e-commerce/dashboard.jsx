import React from "react";
import Item from "../Others/card";
import Footer from "../Others/footer";
import { Container } from "react-bootstrap";

const Vcards = [
  {
    id: 1,
    title: "Productos",
    image: "../images/productos.png",
    link: "/e-commerce/consultProduct",
  },
  {
    id: 2,
    title: "Ordenes",
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
    link: "#",
  },
  {
    id: 7,
    title: "Acerca de...",
    image: "../images/acercade.png",
    link: "/e-commerce/about",
  },
  {
    id: 8,
    title: "Cerrar sesión",
    image: "../images/cerrarsesion.png",
    link: "/",
  },
];

export function Dashboard() {
  return (
    <>
      <Container fluid className="text-center" >
        <Container className="align-items-center h-100 " centered>
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
          </div>
        </Container>
      </Container>
      <br />
      <Footer />
    </>
  );
}

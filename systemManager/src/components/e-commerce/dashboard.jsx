import React from "react";
import Item from "../Others/card";
import Footer from "../Others/footer";

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
    link: "#",
  },
  {
    id: 5,
    title: "Métricas",
    image: "../images/metricas.png",
    link: "#",
  },
  {
    id: 6,
    title: "Mi página",
    image: "../images/mipagina.png",
    //redireccion a pagina cliente
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
      <div className="container h-100 align-items-center mt-2">
        <h1 className="text-center my-4">¡Hola de nuevo!</h1>
        <div className="row ">
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
      </div>
      <br />
      <Footer />
    </>
  );
}

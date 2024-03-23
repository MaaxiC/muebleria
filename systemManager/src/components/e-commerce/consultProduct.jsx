import {
  fetchCategories,
  deleteProduct,
  fetchProductsByPage
} from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ProductModal } from "../modals/productModal";
import { StockModal } from "../modals/adjustStockModal";
import { EditProductModal } from "../modals/editProductModal";
import Footer from "../Others/footer";
import { useState } from "react";
import { Row } from "react-bootstrap";

export function ConsultProduct() {
  const categoriesData = useQuery(["categories"], fetchCategories, {
    staleTime: 6000,
  });

  const Categorias = categoriesData.data;

  const findCategory = (id) => {
    return (
      Categorias?.find((item) => item.id === id)?.nombre || "Sin categoria"
    );
  };

  const [modalCreateShow, setModalCreateShow] = React.useState(false);
  const [modalUpdateShow, setModalUpdateShow] = React.useState(false);
  const [modalEditShow, setModalEditShow] = React.useState(false);

  const [productoelegido, setProductoElegido] = React.useState('');
  const [tituloProducto, setTitulo] = React.useState('');
  const [descripcionProducto, setDescripcionProducto] = React.useState('');
  const [codigoProducto, setCodigoProducto] = React.useState('');
  const [fotoProducto, setFotoProducto] = React.useState('');
  const [precioProducto, setPrecioProducto] = React.useState('');
  const [categoriaProducto, setCategoriaProducto] = React.useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery(["productsTable", page], () => fetchProductsByPage(page), {
    staleTime: 60000,
  });
  const Productos = data;

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    await refetch();
    window.location.reload();
  };

  if (isLoading) return "Cargando...";

  return (
    <>
      <Container className="align-center my-4">
        <Container className="d-md-flex my-4 justify-content-end">
          <Button
            className="btn btn-success"
            variant=""
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={() => setModalCreateShow(true)}
          >
            Agregar nuevo producto
          </Button>
        </Container>
        <Table bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Codigo</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock Comprometido</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.codigo}</td>
                <td>{producto.precio}</td>
                <td>{producto.stock}</td>
                <td>{producto.stockComprometido}</td>
                <td>{findCategory(producto.categoria)}</td>
                <td>
                  <Container className="d-md-flex justify-content-center">
                  <Button
                      className="btn btn-primary "
                      style={{ marginLeft: "10px", margin:"5px"}}
                      onClick={() => {
                        setModalEditShow(true);
                        setProductoElegido(producto.id);
                        setTitulo(producto.nombre);
                        setDescripcionProducto(producto.descripcion);
                        setCodigoProducto(producto.codigo);
                        setFotoProducto(producto.foto);
                        setPrecioProducto(producto.precio);
                        setCategoriaProducto(producto.categoria);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      className="btn btn-warning "
                      style={{ marginLeft: "10px", margin:"5px" }}
                      onClick={() => {
                        setProductoElegido(producto.id);
                        setModalUpdateShow(true);
                        setTitulo(producto.nombre);
                      }}
                    >
                      Ajustar
                    </Button>
                    <Button
                      className="btn btn-danger "
                      variant=""
                      style={{ marginLeft: "10px", margin:"5px" }}
                      onClick={() => handleDeleteProduct(producto.id)}
                    >
                      Eliminar
                    </Button>
                  </Container>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setPage(page + 1)}
              disabled={Productos.length < 10}
            >
              Siguiente
            </button>
          </div>
        </Row>
      </Container>
      <ProductModal
        show={modalCreateShow}
        onHide={() => setModalCreateShow(false)}
      />
      <StockModal
        show={modalUpdateShow}
        onHide={() => setModalUpdateShow(false)}
        selectedProduct={productoelegido}
        titulo={tituloProducto}
      />
      <EditProductModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        productId={productoelegido}
        tituloProd={tituloProducto}
        descripcionProd={descripcionProducto}
        codigoProd={codigoProducto}
        fotoProd={fotoProducto}
        precioProd={precioProducto}
        categoriaProd={categoriaProducto}                
      />
      <Footer/>
    </>
  );
}
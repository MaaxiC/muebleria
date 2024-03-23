import { fetchCategories, deleteCategory } from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import { Container, Table } from "react-bootstrap";
import { CategoryModal } from "../modals/categoryModal";
import { ConfirmDeleteModal } from "../modals/confirmDelete";
import { Button } from "react-bootstrap";
import Footer from "../Others/footer";
import React from "react";

export function Category() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalDeleteShow, setModalDeleteShow] = React.useState(false);

  const [productToDelete, setCodigoBorrar] = React.useState("");
  const [tituloCategoria, setTituloCategoria] = React.useState("");

  const { data, isLoading, refetch } = useQuery(
    ["categories"],
    fetchCategories,
    {
      staleTime: 6000,
    }
  );
  const Categorias = data;

  if (isLoading) return "Cargando...";

  return (
    <>
      <Container className="align-center my-4">
        <Container className="d-flex my-2 justify-content-end">
          <Button
            className="btn btn-success"
            onClick={() => setModalShow(true)}
          >
            Agregar una nueva categoría
          </Button>
        </Container>
        <br />
        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>
                  {/* <Button className="btn btn-primary">Editar</Button> */}
                  <Button
                      className="btn btn-danger "
                      style={{ marginLeft: "10px", margin: "5px" }}
                      onClick={() => {
                        setCodigoBorrar(categoria.id);
                        setTituloCategoria(categoria.nombre);
                        setModalDeleteShow(true);
                      }}
                    >
                      Eliminar
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <CategoryModal show={modalShow} onHide={() => setModalShow(false)} />
      <br />
      <ConfirmDeleteModal
        show={modalDeleteShow}
        onHide={() => setModalDeleteShow(false)}
        id={productToDelete}
        titulo={tituloCategoria}
        name="Categoría"
        mensaje="la categoría "
      />
      <Footer/>
    </>
  );
}

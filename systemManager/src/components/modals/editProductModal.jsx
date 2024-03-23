import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  updateProduct,
  fetchCategories,
} from "../../services/products";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';

export function EditProductModal(props) {
  const [name, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery(
    ["categories"],
    fetchCategories,
    {
      staleTime: 6000,
    }
  );
  const Categorias = categoriesData;

  const {tituloProd, descripcionProd, codigoProd, fotoProd, precioProd, categoriaProd, productId, ...others } = props;

  useEffect(() => {
    setProduct(tituloProd);
    setDescription(descripcionProd);
    setCode(codigoProd);
    setPrice(precioProd);
    setCategory(categoriaProd);
  }, [tituloProd, descripcionProd, codigoProd, fotoProd, precioProd, categoriaProd]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name === "" ||
      description === "" ||
      code === "" ||
      price === "" ||
      category === ""
    ) {
      Swal.fire("Todos los campos deben estar completos");
      return;
    } else {
      try {
        await updateProduct(productId, {
          nombre: name,
          descripcion: description,
          codigo: code,
          precio: price,
          categoria: category,
        });
        others.onHide();
        window.location.replace("/e-commerce/consultProduct");
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  if (categoriesLoading) return "Loading...";

  return (
    <>
      <Modal
        className="bg-primary bg-opacity-25"
        backdrop="static"
        {...others}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {tituloProd}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="card container " onSubmit={handleSubmit}>
            <div className="row mt-2"></div>
            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Nombre de producto</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Escribe el nombre..."
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Escribe la descripción..."
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Código</Form.Label>
              <Form.Control
                type="value"
                placeholder="Escribe el código..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el precio..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled value="">
                  Elegir categoria
                </option>
                {Categorias.map((categoria) => (
                  <option
                    name="categoria"
                    value={categoria.id}
                    key={categoria.id}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="success my-3" type="submit">
              Actualizar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={others.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

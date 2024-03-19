import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import {
  addProduct,
  fetchCategories,
} from "../../services/products";
import { useQuery } from "@tanstack/react-query";

export function ProductModal(props) {
  const [name, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState("");
  const [InitialStock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery(
    ["categories"],
    fetchCategories,
    {
      staleTime: 6000,
    }
  );
  const Categorias = categoriesData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name === "" ||
      description === "" ||
      code === "" ||
      price === "" ||
      InitialStock === "" ||
      category === ""
    ) {
      alert("Todos los campos deben estar completos");
      return;
    } else {
      console.log(photo);
      if (photo.length === 0) {
        alert("Seleccione al menos una imagen para subir");
        return;
      }
      try {
        await addProduct({
          nombre: name,
          descripcion: description,
          codigo: code,
          foto: photo,
          precio: price,
          stock: InitialStock,
          categoria: category,
        });
        props.onHide();
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
        className="bg-success bg-opacity-25"
        backdrop="static"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Agregar nuevo producto
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

            {/* <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese link de imagen"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept= "image/png, image/jpeg, image/jpg"
                onChange={(e) => setPhoto(e.target.files)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Precio ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el precio..."
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el stock..."
                value={InitialStock}
                onChange={(e) => setStock(e.target.value)}
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
              Añadir
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={props.onHide}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

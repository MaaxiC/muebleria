import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { updateOrder } from "../../services/orders";

export function EditOrderModal(props) {
  const [order, setOrder] = useState(props.order);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      order.nombre === "" ||
      order.apellido === "" ||
      order.dni === "" ||
      order.montoTotal === ""
    ) 
      return alert("Todos los campos deben estar completos");
    if (parseInt(order.dni) < 1000000 || parseInt(order.dni) > 99999999)
      return alert("El DNI debe tener 8 dígitos");
    try {
      await updateOrder(order.id, order);
      window.location.replace("/e-commerce/order");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <>
      <Modal
        className="bg-primary bg-opacity-25"
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {order.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="card container " onSubmit={handleSubmit}>
            <div className="row mt-2"></div>
            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={order.nombre}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Escribe el nombre..."
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                value={order.apellido}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="Escribe el apellido..."
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el dni..."
                value={order.dni}
                onChange={(e) => setOrder(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicNumber">
              <Form.Label>montoTotal</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese link de imagen"
                value={order.montoTotal}
                onChange={(e) => setOrder(e.target.value)}
              />
            </Form.Group>

            <Button variant="success my-3" type="submit">
              Actualizar
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
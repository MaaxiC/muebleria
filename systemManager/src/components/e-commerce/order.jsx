import { fetchOrders, updateOrder } from "../../services/orders";
import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import { EditOrderModal } from "../modals/editOrderModal";

export function Order() {
  const { data } = useQuery(["orders"], fetchOrders, {
    staleTime: 6000,
  });
  const Ordenes = data;

  const changeOrder = async (id, estado) => {
    try {
      if (estado === "Confirmado") {
        await updateOrder(id, { estado: "Confirmado" });
        return alert("Orden confirmada correctamente"); //Cambiar por SweetAlert
      }
      await updateOrder(id, { estado: "Rechazado" });
      alert("Orden rechazada correctamente"); //Cambiar por SweetAlert
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const [modalEditShow, setModalEditShow] = useState(false);
  const [order, setOrder] = useState({});

  return <>
      <Container className="align-center mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dni</th>
              <th>Monto Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {Ordenes?.map((orden, index) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.nombre}</td>
                <td>{orden.apellido}</td>
                <td>{orden.dni}</td>
                <td>{orden.montoTotal}</td>
                <td>{orden.estado}</td>
                <td>
                  <Button
                    className="btn btn-success"
                    onClick={() => changeOrder(orden.id, "Confirmado")}
                  >
                    Confirmar Orden
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={() => changeOrder(orden.id, "Rechazado")}
                  >
                    Rechazar Orden
                  </Button>
                  <Button
                    className="btn btn-primary"
                    onClick={() => {
                      setModalEditShow(true);
                      setOrder(orden);
                    }}
                  >
                    Editar Orden
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <EditOrderModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        order={order}               
      />
    </>
}

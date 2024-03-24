import { fetchOrdersByPage, updateOrder, fetchCountOrders } from "../../services/orders";
import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import { EditOrderModal } from "../modals/editOrderModal";
import Footer from "../Others/footer";
import { Row } from "react-bootstrap";
import {exportToExcel} from "../../services/exportData";
import Swal from "sweetalert2";

export function Order() {
  const [page, setPage] = useState(1);

  const { data } = useQuery(["ordersTable", page], () => fetchOrdersByPage(page), {
    staleTime: 6000,
  });

  const Ordenes = data ? data : undefined;

  const maxPagesCount = useQuery(["ordersCount"], () => fetchCountOrders(), {
    staleTime: 60000,
  });
  const maxPages = maxPagesCount?.data;

  const changeOrder = async (id, estado) => {
    try {
      if (estado === "Confirmado") {
        await updateOrder(id, { estado: "Confirmado" });
        window.location.reload();
        return Swal.fire("Orden confirmada correctamente");
      }
      await updateOrder(id, { estado: "Rechazado" });
      window.location.reload();
      Swal.fire("Orden rechazada correctamente");
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const [modalEditShow, setModalEditShow] = useState(false);
  const [order, setOrder] = useState({});

  return (
    <>
      <Container className="align-center mt-4">
        <Table id="OrderTable" variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dni</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Monto Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Ordenes?.map((orden, index) => (
              <tr key={orden.id}>
                <td>{orden.nombre}</td>
                <td>{orden.apellido}</td>
                <td>{orden.dni}</td>
                <td>{orden.created_at}</td>
                <td>
                  {JSON.parse(orden.productos).map((producto) => (
                    <ul key={producto.id}>
                      <li>{`${producto.nombre} x ${producto.cantidad} cant.`}</li>
                    </ul>
                  ))}
                </td>
                <td>${orden.montoTotal}</td>
                <td>{orden.estado}</td>
                <td>
                  <Button
                    className={
                      orden.estado === "Pendiente"
                        ? "btn btn-success mx-2"
                        : "btn btn-success mx-2 disabled"
                    }
                    style={{ margin: "5px" }}
                    onClick={() => changeOrder(orden.id, "Confirmado")}
                  >
                    Confirmar Orden
                  </Button>
                  <Button
                    className={
                      orden.estado === "Pendiente"
                        ? "btn btn-danger mx-2"
                        : "btn btn-danger mx-2 disabled"
                    }
                    onClick={() => changeOrder(orden.id, "Rechazado")}
                    style={{ margin: "5px" }}
                  >
                    Rechazar Orden
                  </Button>
                  <Button
                    className="btn btn-primary mx-2"
                    onClick={() => {
                      setModalEditShow(true);
                      setOrder(orden);
                    }}
                    style={{ margin: "5px" }}
                  >
                    Editar Orden
                  </Button>
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
              disabled={(maxPages && page === maxPages) || maxPages === 0}
            >
              Siguiente
            </button>
          </div>
        </Row>
      </Container>
      <Container className="d-md-flex my-4 justify-content-end">
          <Button
            className="btn btn-success"
            variant=""
            style={{ marginLeft: "10px", marginRight: "10px" }}
            onClick={() => exportToExcel("OrderTable", `Ventas - ${new Date().toLocaleDateString()}`)}
          > 
            Exportar datos a Excel
          </Button>
        </Container>
      <Footer />
      <EditOrderModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        order={order}
      />
    </>
  );
}

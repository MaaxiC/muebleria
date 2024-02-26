import { fetchOrders, updateOrder } from "../../services/orders";
import { useQuery } from "@tanstack/react-query";
import { Table } from "react-bootstrap";
import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import Footer from "../Others/footer";

export function Order() {
  const { data } = useQuery(["orders"], fetchOrders, {
    staleTime: 6000,
  });
  const Ordenes = data;
  const stateData = useQuery(["states"], fetchStates, {
    staleTime: 6000,
  });

  const [arrayEstado, setArrayEstado] = useState();

  const Estados = stateData.data;

  const handleChange = (event) => {
    if (arrayEstado === undefined) {
      setArrayEstado([{ id: event.target.id, value: event.target.value }]);
    } else if (arrayEstado.find((element) => element.id === event.target.id)) {
      arrayEstado.find((element) => element.id === event.target.id).value =
        event.target.value;
    } else {
      setArrayEstado([
        ...arrayEstado,
        { id: event.target.id, value: event.target.value },
      ]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (arrayEstado !== undefined) {
      try {
        arrayEstado.forEach(async (element) => {
          await updateOrder(element.id, { estado: element.value });
        });
        alert("Ordenes actualizadas correctamente");
        setArrayEstado(undefined);
      } catch (error) {
        alert(error.response.data.error);
  const changeOrder = async (id, estado) => {
    try {
      if (estado === "Confirmado") {
        await updateOrder(id, { estado: "Confirmado" });
        window.location.reload();
        return alert("Orden confirmada correctamente"); //Cambiar por SweetAlert
      }
      await updateOrder(id, { estado: "Rechazado" });
      window.location.reload();
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
              <th>Fecha</th>
              <td>Productos</td>
              <th>Monto Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Ordenes?.map((orden, index) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.nombre}</td>
                <td>{orden.apellido}</td>
                <td>{orden.dni}</td>
                <td>{orden.created_at}</td>
                <td>{JSON.parse(orden.productos).map(producto => (
                  <ul key={producto.id}>
                    <li>{`${producto.nombre} x ${producto.cantidad} cant.`}</li>
                  </ul>
                ))}</td>
                <td>{orden.montoTotal}</td>
                <td>{orden.estado}</td>
                <td>
                  <Button
                    className={
                      orden.estado === "Pendiente" ? 'btn btn-success mx-2' : 'btn btn-success mx-2 disabled'
                    }
                    onClick={() => changeOrder(orden.id, "Confirmado")}
                  >
                    {Estados.map((estado, idx) => {
                      if (
                        orden.estado === "64975148588fe6631b228e20" ||
                        orden.estado === "64975094588fe6631b228e14"
                      ) {
                        return (
                          <option id={idx} key={idx} value={estado.id} disabled>
                            {estado.nombre}
                          </option>
                        );
                      } else {
                        return (
                          <option id={idx} key={idx} value={estado.id}>
                            {estado.nombre}
                          </option>
                        );
                      }
                    })}
                  </Form.Select>
                    Confirmar Orden
                  </Button>
                  <Button
                    className={
                      orden.estado === "Pendiente" ? 'btn btn-danger mx-2' : 'btn btn-danger mx-2 disabled'
                    }
                    onClick={() => changeOrder(orden.id, "Rechazado")}
                  >
                    Rechazar Orden
                  </Button>
                  <Button
                    className="btn btn-primary mx-2"
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
: (
    <>
      Cargando...
      <Footer />
    </>
  );
}

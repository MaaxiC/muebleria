import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { loginUser } from "../../services/users";
import Alert from "react-bootstrap/Alert";
import { Container } from "react-bootstrap";
import Swal from 'sweetalert2';

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginUser({ usuario: username, password: password});
      localStorage.setItem("user", JSON.stringify(user.payload));
      window.location.replace("/e-commerce/dashboard");
    } catch (error) {
      Swal.fire(error.response.data.error);
    }
  };

  return (
    <>
      <Container centered>
        <Form
          className="bg-dark card container h-100 col-md-4 custom-mt text-light"
          onSubmit={handleSubmit}
        >
          <div className="row mt-2">
            <img
              src="images/nacarbanner.png"
              width="750"
              height="150"
              className="d-inline-block align-center"
              alt="P11 Tecnología Banner"
              title="P11 Tecnología"
            />
            <h3 className="mt-3 align-content-center">Bienvenido de nuevo</h3>
          </div>
          <Form.Group className="mb-1" controlId="formBasicNumber">
            <Form.Label>Código de usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar código de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Clave</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresar clave"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br />
          <Button variant="success" type="submit">
            Acceder
          </Button>
          <br />
        </Form>
      </Container>
      <Container className="custom-mt">
      </Container>
    </>
  );
}

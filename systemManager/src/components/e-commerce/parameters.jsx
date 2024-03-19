import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Footer from "../Others/footer";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Alert } from "react-bootstrap";

export function Params() {
  return (
    <>
      <br />
      <Container>
        <h2 className="text-center">Parámetros visuales</h2>
        <Container
          className="card container custom-bg h-100 col-md-9 mt-5 ml-4 mr-5"
          
        >
          <br />
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>
              <h4> Imágenes Carrusel</h4>
            </Form.Label>
            <Form.Control type="file" multiple />
            <h6 className="text-center">
              Se recomienda una resolución de 1580 x 450 pixeles para una mejor
              visualización.
            </h6>
          </Form.Group>
          <br />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              <h4> Imagen banner inferior</h4>
            </Form.Label>
            <Form.Control type="file" />
            <h6 className="text-center">
              Se recomienda una resolución de 1080 x 150 pixeles para una mejor
              visualización.
            </h6>
          </Form.Group>
          <br />
          <Col className="text-center">
            <Button
              variant="success"
              type="submit"
              style={{ marginLeft: "10px", margin: "5px" }}
            >
              Guardar cambios
            </Button>
            <Button
              variant="danger"
              type="submit"
              style={{ marginLeft: "10px", margin: "5px" }}
            >
              Cancelar cambios
            </Button>
          </Col>
          <br />
        </Container>
        <br />
        <Alert variant="info" className="card container h-100 col-md-9 mt-5 ml-4 mr-5">
          <Alert.Heading>¡Importante!</Alert.Heading>
          <p>
            La resolución de las imágenes subidas cumplen un aspecto clave en el
            funcionamiento y estética de tu página web. Sigue las sugerencias
            mencionadas para evitarle molestias visuales a tus clientes. Para el
            caso de "Banner inferior" se recomienda confeccionar una imagen en
            formato GIF. Para el Carrusel Principal se recomiendan de 3 a 5
            imágenes como máximo.
          </p>
          <hr />
          <p className="mb-0">
            Si tienes dudas sobre esta sección, siempre puedes consultar el
            apartado de <a href="">AYUDA, haciendo click aquí.</a>
          </p>
        </Alert>
        <br />
      </Container>
      <Footer />
    </>
  );
}

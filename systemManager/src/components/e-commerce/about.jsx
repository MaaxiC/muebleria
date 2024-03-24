import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Others/footer";

export function AboutUs() {
  return (
    <>
      <Container className="mb-4">
        <Row className="justify-content-center mt-5">
          <Col md="auto">
            <Card className="bg-dark">
              <Card.Img variant="top" src="../images/j&m.jpg" />
              <Card.Body>
                <p className="text-center text-white">
                  Josué Demaría y Maximiliano Carnero han creado este contenido
                  con dedicación, empleando tecnologías que garantizan
                  facilidad, rapidez y usabilidad para nuestros clientes. Todos
                  los contenidos están protegidos por derechos de autor. Queda
                  prohibida la copia total o parcial sin consentimiento previo.
                  Nos reservamos el derecho de modificar cualquier componente
                  visual del sistema si es necesario. Agradecemos tu comprensión
                  y aplicación de estas directrices.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <h4 className="text-center text-white mb-4">Contacto</h4>
        <Container className="text-center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" width="250" height="200" alt=""/>
          <Row className="justify-content-center mt-4">
            <h3>
              <a className="text-white" href="https://gmail.com/" target="_blank" rel="noreferrer">josuedominguez052@gmail.com</a>
            </h3>
          </Row>
        </Container>
      </Container>
      <Footer />
    </>
  );  
}

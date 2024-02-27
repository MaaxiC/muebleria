import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Others/footer";

export function AboutUs(){
  return (
    <>
    <Container className="mb-4">
      <Row className="justify-content-center mt-5">
        <Col md="auto">
          <Card>
            <Card.Img
              variant="top"
              src="../images/banneraboutus.png"
              width="750"
               height="500"
            />
            <Card.Body>
              <p className="text-center">
              El SEG (Sistema de E-Commerce y Gestión) ha sido creado por Josué Demaría y Maximiliano Carnero utilizando tecnologías idóneas para garantizar la facilidad, rapidez y usabilidad en la experiencia del cliente. 
              Todos los contenidos están protegidos por derechos de autor. Se prohíbe la copia total o parcial sin consentimiento previo. 
              Se reserva el derecho de modificación de cualquier componente visual de sistema si así fuera necesario.
               
              Se agradece el entendimiento y aplicación de los puntos anteriormente mencionados.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

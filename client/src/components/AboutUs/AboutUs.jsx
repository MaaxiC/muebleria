import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AboutUs = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md="auto">
          <Card>
            <Card.Img
              variant="top"
              src="https://i.imgur.com/ZAOzV16.jpeg"
              height="500"
              className="img-fluid"
            />
            <Card.Body>
              <p className="text-center">
                Nacar es una empresa familiar dedicada al rubro doméstico.
                Producimos variedad de mobiliario destinado a la contención de
                las plantas que dan vida a tu casa, y proyectamos un paulatino
                desarrollo en el rubro de la decoración. Nuestros productos son
                fabricados con madera de eucalipto, un material firme y durable,
                ideal para interiores. Proveemos de forma mayorista a viveros y
                también fabricamos por encargo a particulares. Ofrecemos
                garantía y asesoramiento en caso de necesitarse. ¡No dudes en
                contactarnos! Nos encargamos de los envíos en Córdoba Capital
                los sábados. Para envíos lejanos, gestionamos con encomienda o
                comisionista de acuerdo a la zona/pueblo. Si sos del interior,
                llevamos tu pedido a tu transporte de confianza.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;

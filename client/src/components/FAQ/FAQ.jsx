import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FAQ = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-4 text-center">
        <Col>
          <img
            className="img-fluid"
            style={{ width: "30%" }}
            src="https://static.vecteezy.com/system/resources/previews/010/042/806/original/faq-icon-with-grey-color-faq-illustration-isolated-in-white-background-frequently-asked-question-logo-best-used-for-mobile-applications-and-web-design-free-vector.jpg"
            alt="FAQ"
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>¿Qué es Nácar?</Accordion.Header>
              <Accordion.Body>
                Nácar es una empresa familiar con una trayectoria dedicada al
                rubro doméstico. Nos especializamos en la producción de
                mobiliario diseñado para contener las plantas que dan vida a tu
                hogar. Además, estamos expandiendo gradualmente nuestra
                presencia en el ámbito de la decoración.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>¿Qué madera utilizan?</Accordion.Header>
              <Accordion.Body>
                Madera de Eucalipto: Nuestros productos están fabricados con
                madera de eucalipto, un material firme y duradero. El eucalipto
                es especialmente adecuado para interiores, brindando una
                combinación de resistencia y belleza natural.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>¿Realizan venta Mayorista?</Accordion.Header>
              <Accordion.Body>
                Sí, hacemos venta mayorista y minorista. Suministramos nuestros
                productos a viveros y comercios mayoristas.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>¿Fabrican muebles personalizados?</Accordion.Header>
              <Accordion.Body>
              ¿Por supuesto! Fabricamos por encargo para particulares, adaptándonos a tus necesidades específicas.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Header>¿Hacen envíos?</Accordion.Header>
              <Accordion.Body>
                Córdoba Capital: Realizamos entregas los sábados en Córdoba
                Capital. 
                Envíos Lejanos: Para envíos a zonas más alejadas,
                gestionamos con encomiendas o comisionistas según la ubicación.
                Si te encuentras en el interior, llevaremos tu pedido al
                transporte de tu confianza.
              </Accordion.Body>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;

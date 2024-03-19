import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  return (
    <Container fluid className="">
        <Row className="footer align-items-center p-2 fixed-bottom">
            <Col></Col>
            <Col>
                <p className="text-center text-white">Nácar - Todos los derechos reservados</p>
            </Col>
            <Col>
                <p className="text-center text-white">Nuestras redes:</p>
                <div className="d-flex justify-content-center">
                    <h2><a className="text-white p-2" href="https://www.instagram.com/nacarentucasa/" target="_blank"><BsInstagram/></a></h2>
                    <h2><a className="text-white p-2" href="https://www.facebook.com/profile.php?id=100063922039870" target="_blank"><BsFacebook/></a></h2>
                    {/* Agregar icono whatsapp */}
                </div>  
            </Col>
        </Row>
    </Container>
  )
}

export default Footer
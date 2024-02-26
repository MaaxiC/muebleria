import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsWhatsapp } from "react-icons/bs";


const Footer = () => {
  return (
    <Container fluid className="">
        <Row className="bg-dark align-items-center p-4">
            <Col></Col>
            <Col>
                <p className="text-center text-white">Sistema de ecommerce y gestión integrada</p>
            </Col>
            <Col>
                <p className="text-center text-white">Soporte:</p>
                <div className="d-flex justify-content-center">
                    <h2><a className="text-white p-2" href="https://api.whatsapp.com/send/?phone=%2B5493512166302&text&type=phone_number&app_absent=0" target="_blank"><BsWhatsapp/></a></h2>
                </div>  
            </Col>
        </Row>
    </Container>
  )
}

export default Footer
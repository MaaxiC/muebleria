import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardGroup from 'react-bootstrap/CardGroup';

const Contact = () => {
  return (
    <Container className="custom-margin-top" fluid="lg">
        <Row className="justify-content-center mt-5 text-center">
            <Col md="auto">
                <h2>Horarios de atencion:</h2>
            </Col>
        </Row>  
        <Row className="justify-content-center mt-2 text-center">
            <Col md="auto">
                <h4>Lunes a sábados de 9 a 19hs</h4>
            </Col>
        </Row>              
      <Row>
        <Col className='margin-top-550'>
            <CardGroup className="p-4 mt-3">
                <Card className='align-items-center text-center border-0'>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" style={{width: "50%", position: "center"}}/>
                    <Card.Body>
                    <Card.Title>WhatsApp</Card.Title>
                    <Card.Text>
                    +54 9 351 661-3241
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='align-items-center text-center border-0'>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" style={{width: "50%", position: "center"}}/>
                    <Card.Body>
                    <Card.Title>Instagram</Card.Title>
                    <Card.Text>
                       @nacarentucasa 
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card className='align-items-center text-center p-2 border-0'>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" style={{width: "60%", position: "center"}}/>
                    <Card.Body>
                    <Card.Title>Mail</Card.Title>
                    <Card.Text>
                    nacar6sep@gmail.com
                    </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Col>
      </Row>
    </Container>
    
  )
}

export default Contact
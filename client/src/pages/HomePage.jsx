import Carousel from '../components/Carousel/Carousel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ItemList from '../components/ItemList/ItemList';

function HomePage(){
  return (
    <Container fluid>
      <Row className="mb-5">
        <Carousel/>
      </Row>
      <h1 className='text-center my-4'>Novedades</h1>
      <ItemList/>
      <br />
      <br />
      <div>
        <h4>HOLA</h4>
      <img
            className="d-block w-100 img-fluid"
            src="/src/images/mediosdepago.png"
            alt="Primera Imagen"
          />
      </div>
    </Container>
  )
}
export default HomePage
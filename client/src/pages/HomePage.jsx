import Carousel from "../components/Carousel/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import ItemList from "../components/ItemList/ItemList";
import ItemRec from "../components/ItemRec/ItemRec";
import ItemFav from "../components/ItemFav/ItemFav";

function HomePage() {
  return (
    <>
      <Container fluid>
        <Row className="mb-5">
          <Carousel />
        </Row>
        <Row className="mb-5">
          <h1 className="text-center my-4">Recomendados</h1>
        </Row>
        <Row className="mb-5">
          <ItemRec />
        </Row>
        <Row className="mb-5">
          <h1 className="text-center my-4">Mas Vendidos</h1>
        </Row>
        <Row className="mb-5">
          <ItemFav />
        </Row>
      </Container>
      <Container fluid className="text-center">
        <img src="/images/bannerbajo.gif" className="w-100 mt-5" alt="" />
      </Container>
      <Container  className="text-center">
        <img src="/images/bannermediosdepago.jpg" className="w-100" alt="" />
      </Container>
    </> 
  );
}
export default HomePage;

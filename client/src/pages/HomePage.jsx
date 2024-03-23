import Carousel from "../components/Carousel/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import ItemList from "../components/ItemList/ItemList";
import ItemRec from "../components/ItemRec/ItemList";

function HomePage() {
  return (
    <>
      <Container fluid>
        <Row className="mb-5">
          <Carousel />
        </Row>
        <h1 className="text-center my-4">Recomendados</h1>
        <br />
        {/* <ItemList /> */}
        <ItemRec />
      </Container>
      <br />
      <br />
      <Container fluid className="text-center">
        <img src="/images/bannerbajo.gif" className="w-100" alt="" />
      </Container>
      <br />
      <br />
      <Container  className="text-center">
        <img src="/images/bannermediosdepago.jpg" className="w-100" alt="" />
      </Container>
      <br />
    </> 
  );
}
export default HomePage;

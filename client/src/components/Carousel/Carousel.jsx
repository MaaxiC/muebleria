import Carousel from 'react-bootstrap/Carousel';

const CarouselFade = () => {
  return (
    <Carousel fade className="Carousel justify-content-center">
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="/src/images/car1.png"
            alt="Primera Imagen"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="/src/images/car2.png"

            alt="Segunda Imagen"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img-fluid"
            src="/src/images/car3.png"
            alt="Tercera Imagen"
          />
        </Carousel.Item>
      </Carousel>
  )
}

export default CarouselFade
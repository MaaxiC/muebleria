import { fetchCategories, fetchProductsByCategories } from "../../services/Products";
import { useQuery } from "@tanstack/react-query";
import Item from "../Item/Item";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Categories = () => {
  const [page, setPage] = useState(1);

  const { category } = useParams();

  const { data, isLoading, isError } = useQuery(["productsCategories", page], () => fetchProductsByPage(page), {
    staleTime: 60000,
  });

  const categories = useQuery(["categories"], fetchCategories, {
    staleTime: 60000,
  });

  const categoryValue = categories.data?.map((c) => {
    if (c.id == category) return c.nombre;
  });

  const filterProductByCategory = data?.filter(
    (product) => product.categoria == category
  );

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (isError)
    return (
      <div className="d-flex justify-content-center mt-5">
        <h4>Error al obtener los productos</h4>
      </div>
    );
  return (
    <Container className="custom-margin-top">
      <Row className="p-2 justify-content-center">
        {filterProductByCategory.length > 0 ? (
          <>
            <h1 className="my-3 text-center">{categoryValue}</h1>
            {filterProductByCategory.map((data, idx) => (
              <Item product={data} key={idx} />
            ))}
          </>
        ) : (
          <h4 className="mt-5 text-center">
            No existen productos para la categoria seleccionada
          </h4>
        )}
      </Row>
      <Row>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setPage(page + 1)}
            disabled={filterProductByCategory.length < 10}
          >
            Siguiente
          </button>
        </div>
      </Row>
    </Container>
    
  );

};

export default Categories;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../redux/slices/productSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CartPlus, InfoCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { addItemToCartThunk } from "../../redux/slices/cartSlice";
import { getToken } from "../../services/tokenServices";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  const { products: allProducts } = useSelector((state) => state.product);
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = getToken();

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    setProducts(allProducts);
  }, [allProducts]);

  const handleAddCartItem = (productId) => {
    dispatch(addItemToCartThunk({ productId, accessToken }));
  };
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_API_KEY}/uploads/${product.image}`}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                  <br />
                  <strong>Price:</strong> ${product.price.toFixed(2)}
                  <br />
                  <strong>Stock:</strong>{" "}
                  {product.stock > 0 ? (
                    product.stock
                  ) : (
                    <span className="text-danger">Out of stock</span>
                  )}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    onClick={() => handleAddCartItem(product._id)}
                    disabled={product.stock <= 0}
                  >
                    <CartPlus className="me-2" />
                    Add to Cart
                  </Button>
                  <Link to={product._id}>
                    <Button variant="info">
                      <InfoCircle className="me-2" />
                      Details
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;

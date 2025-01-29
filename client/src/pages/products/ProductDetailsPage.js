import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByIdThunk } from "../../redux/slices/productSlice";
import { addItemToCartThunk } from "../../redux/slices/cartSlice";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CartPlus } from "react-bootstrap-icons";
import { getToken } from "../../services/tokenServices";

const ProductDetailsPage = () => {
  const params = useParams();
  const { productId } = params;

  const dispatch = useDispatch();

  const [product, setProduct] = useState({});

  const { product: productData, isLoading } = useSelector(
    (state) => state.product
  );
  // const { accessToken } = useSelector((state) => state.auth);
  const accessToken = getToken();

  useEffect(() => {
    dispatch(getProductByIdThunk(productId));
  }, [dispatch]);

  useEffect(() => {
    setProduct(productData);
  }, [productData]);

  const handleAddCartItem = (productId) => {
    dispatch(addItemToCartThunk({ productId, accessToken }));
  };

  return (
    <Container className="mt-4">
      {!isLoading && (
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                style={{ height: "300px", objectFit: "cover" }}
              />
            </Card>
          </Col>
          <Col md={6}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> ${product.price?.toFixed(2)}
            </p>
            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? (
                product.stock
              ) : (
                <span className="text-danger">Out of stock</span>
              )}
            </p>
            <Button
              onClick={() => handleAddCartItem(product._id)}
              disabled={product.stock <= 0}
            >
              <CartPlus className="me-2" />
              Add to cart
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetailsPage;

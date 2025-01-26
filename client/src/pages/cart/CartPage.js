import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartThunk,
  updateCartItemThunk,
  removeCateItemThunk,
} from "../../redux/slices/cartSlice";
import { addOrderThunk } from "../../redux/slices/orderSlice";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import {
  Buildings,
  Dash,
  GeoAlt,
  Globe,
  Plus,
  Signpost,
  Trash,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [shippingAdress, setShippingAdress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const { items: itemsData } = useSelector((state) => state.cart);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCartThunk(accessToken));
  }, [dispatch]);

  useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  const handleUpdateItem = (productId, quantity, type) => {
    if (type === "plus") {
      dispatch(
        updateCartItemThunk({ productId, quantity: quantity + 1, accessToken })
      ).then(() => dispatch(getCartThunk(accessToken)));
    } else if (type === "minus") {
      dispatch(
        updateCartItemThunk({ productId, quantity: quantity - 1, accessToken })
      ).then(() => dispatch(getCartThunk(accessToken)));
    }
  };

  const handleDeleteItem = (productId) => {
    dispatch(removeCateItemThunk({ productId, accessToken })).then(() =>
      dispatch(getCartThunk(accessToken))
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShippingAdress({ address: "", city: "", postalCode: "", country: "" });
  };

  const handleInputChange = (e) => {
    setShippingAdress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrderThunk({ shippingAdress, accessToken })).then(() => {
      navigate("/orders");
    });
  };

  return (
    <Container>
      <h1 className="mb-4">Your Cart</h1>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.items?.map((item, i) => (
            <tr key={item.product._id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={`${process.env.REACT_APP_API_KEY}/uploads/${item.product.image}`}
                  alt={item.product.name}
                  style={{ height: "50px", width: "50px", objectFit: "cover" }}
                ></img>
              </td>
              <td>{item.product.name}</td>
              <td>${item.product.price.toFixed(2)}</td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() =>
                      handleUpdateItem(item.product._id, item.quantity, "minus")
                    }
                  >
                    <Dash />
                  </Button>
                  <Form.Control
                    type="text"
                    value={item.quantity}
                    readOnly
                    style={{
                      width: "50px",
                      textAlign: "center",
                    }}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() =>
                      handleUpdateItem(item.product._id, item.quantity, "plus")
                    }
                  >
                    <Plus />
                  </Button>
                </div>
              </td>
              <td>${(item.product.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteItem(item.product._id)}
                >
                  <Trash className="me-2" />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 8 }}>
          <h4>
            Total Price: <strong>${items.totalPrice?.toFixed(2)}</strong>
          </h4>
          <Button
            onClick={() => setShowModal(true)}
            variant="success"
            className="mt-2 w-100"
          >
            Go To Order
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>dddd</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            Total Price:{" "}
            <Badge style={{ fontSize: "15px" }}>$ {items.totalPrice}</Badge>
          </div>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3" controlId="address">
              <Form.Label>
                <GeoAlt className="me-2" />
                Address
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={shippingAdress.address}
                onChange={handleInputChange}
                placeholder="Enter Your Address"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="city">
              <Form.Label>
                <Buildings className="me-2" />
                City
              </Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={shippingAdress.city}
                placeholder="Enter Your City"
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="postalCode">
              <Form.Label>
                <Signpost className="me-2" />
                Postal Code
              </Form.Label>
              <Form.Control
                type="number"
                name="postalCode"
                value={shippingAdress.postalCode}
                onChange={handleInputChange}
                placeholder="Enter Your Postal Code"
                required
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="country">
              <Form.Label>
                <Globe className="me-2" />
                Country
              </Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={shippingAdress.country}
                onChange={handleInputChange}
                placeholder="Enter Your Country"
                required
              />
            </FormGroup>
            <Button type="submit" className="mt-2 w-100">
              Place Order
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CartPage;

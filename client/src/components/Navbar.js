import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Badge, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Cart, PersonCircle, BoxArrowRight } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../redux/slices/authSlice";

const EcommerceNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: userData } = useSelector((state) => state.profile);
  const { items: itemsData } = useSelector((state) => state.cart);

  const [user, setUser] = useState(null);
  const [items, setItems] = useState(0);

  useEffect(() => setUser(userData), [userData]);

  useEffect(() => setItems(itemsData), [itemsData]);

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate("/");
        setUser(null);
        setItems(0);
      })
      .catch((err) => alert("Logout error : " + (err.message || err)));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav style={{ marginLeft: "100px" }}>
            {/* <Nav.Link as={Link} to="/">
              Home
            </Nav.Link> */}
            <Nav.Link
              style={{ color: "white" }}
              className="me-4"
              as={Link}
              to="/"
            >
              Products
            </Nav.Link>
            <Nav.Link
              style={{ color: "white" }}
              className="me-4"
              as={Link}
              to="/cart"
            >
              Cart
            </Nav.Link>
            <Nav.Link
              style={{ color: "white" }}
              className="me-4"
              as={Link}
              to="/orders"
            >
              Orders
            </Nav.Link>
            <Nav.Link
              style={{ color: "white" }}
              className="me-4"
              as={Link}
              to="/admin"
            >
              Admin
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="" as={Link} to="/cart">
              <Cart style={{ color: "white" }} className="me-1" />
              {items?.items?.length > 0 && (
                <Badge style={{ color: "black" }} bg="warning" className="ms-1">
                  {items?.items?.length}
                </Badge>
              )}
            </Nav.Link>
            {user?._id ? (
              <NavDropdown
                className="ms-4"
                title={<PersonCircle style={{ color: "white" }} />}
                id="user-menu"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <BoxArrowRight className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link style={{ color: "white" }} as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link style={{ color: "white" }} as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default EcommerceNavbar;

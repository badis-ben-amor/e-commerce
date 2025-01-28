import React from "react";
import { Navbar, Nav, NavDropdown, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Cart, PersonCircle, BoxArrowRight } from "react-bootstrap-icons";

const EcommerceNavbar = () => {
  const user = null;
  // const user = { name: "John Doe" }; // Example user
  const cartItemsCount = 33;

  const onLogout = () => {
    console.log("User logged out");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/products">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav style={{ marginLeft: "100px" }}>
            {/* <Nav.Link as={Link} to="/">
              Home
            </Nav.Link> */}
            <Nav.Link className="me-4" as={Link} to="/products">
              Products
            </Nav.Link>
            <Nav.Link className="me-4" as={Link} to="/cart">
              Cart
            </Nav.Link>
            <Nav.Link className="me-4" as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link className="me-4" as={Link} to="/admin">
              Admin
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="" as={Link} to="/cart">
              <Cart className="me-1" />
              {cartItemsCount > 0 && (
                <Badge bg="success" className="ms-1">
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>
            {user ? (
              <NavDropdown title={<PersonCircle />} id="user-menu" align="end">
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onLogout}>
                  <BoxArrowRight className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
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

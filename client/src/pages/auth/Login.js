import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginThunk } from "../../redux/slices/authSlice";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { EnvelopeFill, KeyFill } from "react-bootstrap-icons";

const Login = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoginThunk({ email, password }));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} style={{ border: "2px solid", borderRadius: "10px" }}>
          <h2 className="text-center mb-4">Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                <EnvelopeFill className="me-2" />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>
                <KeyFill className="me-2" />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </Form.Group>
            <Button type="submit" className="my-3 w-100">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

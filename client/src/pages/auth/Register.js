import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterThunk } from "../../redux/slices/authSlice";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { PersonFill, EnvelopeFill, KeyFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegisterThunk({ name, email, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => setError(err.message || err));
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} style={{ border: "2px solid", borderRadius: "10px" }}>
          <h2 className="text-center mb-4">Register</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>
                <PersonFill className="me-2" />
                Name
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
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
            <Form.Group className="" controlId="password">
              <Form.Label>
                <KeyFill className="me-2" />
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter you password"
                required
              />
            </Form.Group>
            <Button className="my-3 w-100" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

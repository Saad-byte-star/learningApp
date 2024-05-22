import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import { authenticate } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../services/globals";
import { useContext, useEffect } from "react";

export default function Login({ setToken }) {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const [logInfo, setLogInfo] = useState({
    Email: "",
    Password: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setLogInfo({ ...logInfo, [name]: value });
    // console.log( `${name} , ${value}`)
  }

  async function handleLogIn() {
    try {
      const response = await fetch(`http://localhost:8000/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logInfo),
      credentials: 'include', // Ensures cookies are sent with the request
    });

      if (response.ok) {
        const loginData = await response.json();
        const userResponse = await fetch(`http://localhost:8000/api/users/user`, {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent with the request
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("Logged In User:", userData);
          setUser(userData);
        } else {
          console.log('error fetching user data')
        }
      }else{
        console.log('error logging in')
      }
    } catch (error) {
      console.log("Unable to Login", error);
    }
  }

  useEffect(() => {
    if (user && user._id) {
      navigate(`/enrolled/${user._id}`);
    }
  }, [user, navigate]);

  const navigateToSignup = () => {
    navigate(`/`);
  };

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <Row>
          <Col>
            <Card className="shadow-lg" style={{ width: "500px" }}>
              <Card.Body className="px-5 py-5">
                <center>
                  <Card.Title className="fs-4 pb-3">Login</Card.Title>
                </center>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    name="Email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  className="mb-3"
                  controlId="floatingPassword"
                  label="Password"
                >
                  <Form.Control
                    name="Password"
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                <Button
                  onClick={handleLogIn}
                  className="btn-md rounded-0 py-2"
                  variant="dark"
                >
                  Log In
                </Button>
                <Button
                  onClick={navigateToSignup}
                  className="btn-md rounded-0 py-2 ms-3"
                  variant="outline-secondary"
                >
                  Not Registerd? SignUp
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

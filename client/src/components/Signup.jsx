import axios from "axios";
import React, { useState } from "react";
import { Container , Button , Card , Row , Col , FloatingLabel , Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Signup() {

const navigate = useNavigate();

const navigateToLogin = () => {
  navigate(`/login`);
} 


const [signupInfo , setSignupInfo ] = useState({
  "Name" : "",
  "Email" : "",
  "Password" : "",
  "Role" : "Student"    
})


function handleInputChange(e) {
  const { name, value } = e.target;
  setSignupInfo({ ...signupInfo, [name]: value });
  console.log( `${name} , ${value}`)
};

const options = {
  method: 'POST',
  url: 'http://localhost:8000/api/users',
  data: signupInfo // Directly send signupInfo without nesting
};

const data = JSON.stringify(signupInfo);
console.log(data);

const performSignup = async () => {
  
  try {
    console.log(signupInfo);
    const response = await axios.request(options);
    if ( response.status === 201 ){
      const data = await response.data;
      alert(`Succesfully Registered : ${data.name} , Login to Continue`);
      navigate('/login') 
    }

  } catch (error) {
    return console.log(`this is running failed to post user , ${error}`);
  }

}



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
                  <Card.Title className="fs-4 pb-3">Signup</Card.Title>
                </center>
                
                
                <FloatingLabel className="mb-3" controlId="floatingName" label="Name">
                  <Form.Control name='Name' onChange={handleInputChange} type="text" placeholder="Name" />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control name='Email' onChange={handleInputChange} type="email" placeholder="name@example.com" />
                </FloatingLabel>

                <FloatingLabel className="mb-3" controlId="floatingPassword" label="Password">
                  <Form.Control name='Password' onChange={handleInputChange} type="password" placeholder="Password" />
                </FloatingLabel>

            
                <Button onClick={(()=>{performSignup()})} className="btn-md rounded-0 py-2" variant="dark">Sign Up</Button>
                <Button  onClick={navigateToLogin} className="btn-md rounded-0 py-2 ms-3" variant="outline-secondary">Already Registerd? Login</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

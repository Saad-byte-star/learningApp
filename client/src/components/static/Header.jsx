  import { useContext } from "react";
  import { Container, Nav, Navbar } from "react-bootstrap";
  import { UserContext } from '../../services/globals';
  import { useNavigate } from "react-router-dom";

  export default function Header() {
    
    const navigate = useNavigate();

    const { user , setUser } = useContext(UserContext);

    const viewEnrolled = () => {
      console.log(`Navigating to Enrolled Courses : ${user._id}`);
      console.log(user);
      navigate(`enrolled/${user._id}`);
    }

    return (
      <>
        <Navbar className="p-4" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/home">Learning App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link className="ms-4" href="/home">Home</Nav.Link>
              <Nav.Link className="ms-4" onClick={viewEnrolled} >Enrolled Courses</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }

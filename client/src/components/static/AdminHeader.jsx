import { useContext, useEffect } from "react";
import { Container, Nav, Navbar , Button } from "react-bootstrap";
import { UserContext } from '../../services/globals';
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  
  const navigate = useNavigate();
  // const history = useHistory();

  const { user , setUser } = useContext(UserContext);

  
  const logOut = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/logout`, {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included with the request
      });

      if (response.ok) {
        setUser(null); // Clear the user state
        navigate('/login');
      } else {
        console.log('Error logging out');
      }
    } catch (error) {
      console.log('Unable to logout', error);
    }
  };

  // const logOut = () => {
  //   setUser(null);
  //   if(!user){
  //     navigate('/login');
  //   }  
  // }

  return (
    <>
      <Navbar className="p-4" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="/home">
            Dashboard
          </Navbar.Brand>
          <Nav className="w-100">
            <Button  className="ms-auto" onClick={logOut} variant="outline-light">Log Out</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

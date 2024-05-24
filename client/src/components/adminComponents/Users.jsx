import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  Form
} from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (response.ok) {
          const fetchedUsers = await response.json();
          //   console.log(fetchedUsers);
          setUsers(fetchedUsers);
        } else {
          console.log("error fetching users from the backend");
        }
      } catch (error) {
        console.log("unable to fetch users", error);
      }
    };
    fetchUsers();
  }, [users]);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setNewName(user.Name);
    setNewEmail(user.Email);
    setNewRole(user.Role);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    const updatedUser = {
      ...selectedUser,
      Name: newName,
      Email: newEmail,
      Role: newRole
    };
    try {
        const response = await fetch(`http://localhost:8000/api/users/${selectedUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedUser),
        });
  
        if (response.ok) {
          setUsers(users.map(user => user._id === selectedUser._id ? updatedUser : user));
          setShowModal(false);
        } else {
          console.log("error updating user");
        }
      } catch (error) {
        console.log("unable to update user", error);
      }
    };
  
    const handleDeleteClick = async (userId) => {
        try {
          const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
    
          if (response.ok) {
            setUsers(users.filter(user => user._id !== userId));
          } else {
            console.log("error deleting user");
          }
        } catch (error) {
          console.log("unable to delete user", error);
        }
      };
  
  return (
    <>
      <Container fluid>
        <Row className="pb-3 border-2 border-bottom">
            <Col><h4>Manage Users</h4></Col>
        </Row>
        <Row>
          {users.map((user) => (
            <Col key={user._id} className="col-4 my-3">
              <Card className="rounded-0 m-0 w-100">
                <Card.Body>
                  <Card.Title>
                    <strong>Name :</strong> {user.Name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Email :</strong>&nbsp;&nbsp;
                    {user.Email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Role :</strong>&nbsp;&nbsp;
                    {user.Role.toUpperCase()}
                  </Card.Text>
                  <Button
                    onClick={() => handleEditClick(user)} // MAKE EDIT MODAL FOR THIS TO EDIT THIS USER
                    className="rounded-0"
                    variant="dark"
                    value={user._id}
                  >
                    Edit
                  </Button>
                  <Button
                     onClick={() => handleDeleteClick(user._id)} // IMPLEMENT DELETE FUNCTIONALITY
                    className="float-end rounded-0"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

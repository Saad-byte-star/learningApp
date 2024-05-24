import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  Form,
} from "react-bootstrap";

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/modules`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (response.ok) {
          const fetchedModules = await response.json();
          //   console.log(fetchedUsers);
          setModules(fetchedModules);
        } else {
          console.log("error fetching modules from the backend");
        }
      } catch (error) {
        console.log("unable to fetch modules", error);
      }
    };
    const fetchCourses = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/courses`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent with the request
        });

        if (response.ok) {
          const fetchedCourses = await response.json();
          setCourses(fetchedCourses);
        } else {
          console.log("error fetching courses from the backend");
        }
      } catch (error) {
        console.log("unable to fetch courses", error);
      }
    };

    fetchModules();
    fetchCourses();
  }, [modules]);

  const handleEditClick = (module) => {
    setSelectedModule(module);
    setNewTitle(module.Title);
    setNewContent(module.Content);
    setNewCourse(module.Course._id); // Assuming module.course is an object with an _id field
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    const updatedModule = {
      ...selectedModule,
      Title: newTitle,
      Content: newContent,
      Course: newCourse, // Passing the entire course object
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/modules/${selectedModule._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedModule),
        }
      );

      if (response.ok) {
        setModules(
          modules.map((module) =>
          module._id === selectedModule._id ? updatedModule : module
          )
        );
        setShowModal(false);
      } else {
        console.log("error updating module");
      }
    } catch (error) {
      console.log("unable to update module", error);
    }
  };

  const handleDeleteClick = async (moduleId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/modules/${moduleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setModules(modules.filter((module) => module._id !== moduleId));
      } else {
        console.log("error deleting module");
      }
    } catch (error) {
      console.log("unable to delete module", error);
    }
  };

  const handleAddClick = () => {
    setNewTitle("");
    setNewContent("");
    setNewContent("");
    setShowAddModal(true);
  };

  const handleAddCourse = async () => {
    const newModule = {
      Title: newTitle,
      Content: newContent,
      Course: newCourse,
      Assignments : []
    };

    try {
      const response = await fetch(`http://localhost:8000/api/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newModule),
      });

      if (response.ok) {
        const createdModule = await response.json();
        setModules([...modules, createdModule]);
        setShowAddModal(false);
      } else {
        console.log("error adding module");
      }
    } catch (error) {
      console.log("unable to add module", error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="pb-3 border-2 border-bottom">
          <Col>
            <h4>Manage Modules</h4>
          </Col>
          <Col className="col-2">
            <Button variant="dark"  onClick={handleAddClick} className="rounded-0 w-100">
              Add <strong>+</strong>
            </Button>
          </Col>
        </Row>
        <Row>
          {modules.map((module) => (
            <Col key={module._id} className="col-4 my-3">
              <Card className="rounded-0 m-0 w-100">
                <Card.Body>
                  <Card.Title>{module.Title}</Card.Title>
                  <Card.Text>{module.Content}</Card.Text>
                  <Card.Text> <strong>Course : </strong>&nbsp;&nbsp; {module.Course.Title}</Card.Text>
                  <Button
                    onClick={() => handleEditClick(module)} // MAKE EDIT MODAL FOR THIS TO EDIT THIS USER
                    className="rounded-0"
                    variant="dark"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(module._id)} // IMPLEMENT DELETE FUNCTIONALITY
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
          <Modal.Title>Edit Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCourse">
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                value={newCourse?._id || ""}
                onChange={(e) => {
                  const selected = courses.find(
                    (course) => course._id === e.target.value
                  );
                  setNewCourse(selected);
                }}
              >
                <option value="">Select Course</option>
                {courses
                  .map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.Title}
                    </option>
                  ))}
              </Form.Control>
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
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="addFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="addFormContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="addFormCourse">
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses
                  .map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.Title}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCourse}>
            Add Module
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

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



export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newInstructor, setNewInstructor] = useState("");
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
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
          //   console.log(fetchedUsers);
          setCourses(fetchedCourses);
        } else {
          console.log("error fetching courses from the backend");
        }
      } catch (error) {
        console.log("unable to fetch courses", error);
      }
    };
    const fetchInstructors = async () => {
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
            setInstructors(fetchedUsers);
          } else {
            console.log("error fetching instructors from the backend");
          }
        } catch (error) {
          console.log("unable to fetch instructors", error);
        }
      };
  
      fetchCourses();
      fetchInstructors();
  }, [courses]);

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setNewTitle(course.Title);
    setNewDesc(course.Description);
    setNewInstructor(course.Instructor._id); // Assuming course.Instructor is an object with an _id field
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    const updatedCourse = {
      ...selectedCourse,
      Title: newTitle,
      Description: newDesc,
      Instructor: newInstructor, // Passing the entire instructor object
    };


//   const handleEditClick = (course) => {
//     setSelectedCourse(course);
//     setNewTitle(course.Title);
//     setNewDesc(course.Desc);
//     setNewInstructor(course.Instructor);
//     setShowModal(true);
//   };

//   const handleSaveChanges = async () => {
//     const updatedCourse = {
//       ...selectedCourse,
//       Title: newTitle,
//       Description: newDesc,
//       Instructor: newInstructor,
//     };
    try {
      const response = await fetch(
        `http://localhost:8000/api/courses/${selectedCourse._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedCourse),
        }
      );

      if (response.ok) {
        setCourses(
          courses.map((course) =>
            course._id === selectedCourse._id ? updatedCourse : course
          )
        );
        setShowModal(false);
      } else {
        console.log("error updating course");
      }
    } catch (error) {
      console.log("unable to update course", error);
    }
  };

  const handleDeleteClick = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/courses/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setCourses(courses.filter((course) => course._id !== courseId));
      } else {
        console.log("error deleting course");
      }
    } catch (error) {
      console.log("unable to delete course", error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          {courses.map((course) => (
            <Col key={course._id} className="col-4 my-3">
              <Card className="rounded-0 m-0 w-100">
                <Card.Img
                  className="rounded-0"
                  variant="top"
                  src="/imgs/1.png"
                />
                <Card.Body>
                  <Card.Title>{course.Title}</Card.Title>
                  <Card.Text>{course.Description}</Card.Text>
                  <Button
                    onClick={() => handleEditClick(course)} // MAKE EDIT MODAL FOR THIS TO EDIT THIS USER
                    className="rounded-0"
                    variant="dark"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteClick(course._id)} // IMPLEMENT DELETE FUNCTIONALITY
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
          <Modal.Title>Edit Course</Modal.Title>
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
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="formInstructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                value={newInstructor}
                onChange={(e) => setNewInstructor(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group controlId="formInstructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                as="select"
                value={newInstructor?._id || ""}
                onChange={(e) => {
                  const selected = instructors.find(instructor => instructor._id === e.target.value);
                  setNewInstructor(selected);
                }}
              >
                <option value="">Select Instructor</option>
                {instructors
                  .filter(instructor => instructor.Role.toLowerCase() === "instructor")
                  .map((instructor) => (
                    <option key={instructor._id} value={instructor._id}>
                      {instructor.Name}
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
    </>
  );
}

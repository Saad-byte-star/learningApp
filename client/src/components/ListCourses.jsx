import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useParams , useLocation , useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ListCourses(){
  const { uid } = useParams();
  const [courses , setCourses ] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

useEffect(() => {
  const fetchCourses = async () => {
    let url = `http://localhost:8000/api/courses`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      }
    } catch (error) {
      console.log(`Failed to fetch courses. Error: ${error}`);
    }
  };

  fetchCourses();
}, []);

let enrolledCourses = [];
courses.map( (course) => {
  let students = course.EnrolledStudents;
  console.log(`Students : ${students}`);
  students.map( (std) =>{
    if ( std._id === uid ) {
      enrolledCourses.push(course);
    }
  } )
  console.log(`Enrolled In : ${enrolledCourses}`);
} )

return (
    <Container>
      <Row className="my-4">
        { location.pathname === "/home" 
        ? 
        courses.map((course) => (
          <Col key={course._id} className="col-4 my-3">
            <Card className="rounded-0 m-0 w-100">
              <Card.Img className="rounded-0" variant="top" src="/imgs/1.png" />
              <Card.Body>
                <Card.Title>{course.Title}</Card.Title>
                <Card.Text>{course.Description}</Card.Text>
                <Button onClick={()=>navigate(`/course/${course._id}`)} className="float-end rounded-0" variant="dark">
                  Enroll Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )) 
        :
        enrolledCourses.map((course) => (
          <Col key={course._id} className="col-4 my-3">
            <Card className="rounded-0 m-0 w-100">
              <Card.Img className="rounded-0" variant="top" src="/imgs/1.png" />
              <Card.Body>
                <Card.Title>{course.Title}</Card.Title>
                <Card.Text>{course.Description}</Card.Text>
                <Button onClick={()=>navigate(`/course/${course._id}`)} className="float-end rounded-0" variant="dark">
                  Resume
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )) 
        }
      </Row>
    </Container>
  );
}

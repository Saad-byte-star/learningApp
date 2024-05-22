import { useContext, useEffect, useState } from "react";
import { Button , Card , Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../services/globals";

export default function Course() {
  console.log("Reached Course");
  const [key, setKey] = useState("home");
  const [modules, setModules] = useState([]);
  const location = useLocation();
  const { cid } = useParams();
  const [ course , setCourse ] = useState();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchModules = async () => {
      let url = `http://localhost:8000/api/modules`;
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setModules(data);
        }
      } catch (error) {
        console.log(`Failed to fetch modules. Error: ${error}`);
      }
    };
    const fetchCourse = async () => {
      let url = `http://localhost:8000/api/courses/${cid}`;
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setCourse(data);
        }
      } catch (error) {
        console.log(`Failed to fetch course with id ${cid}. Error: ${error}`);
      }
    };


    fetchModules();
    fetchCourse();
  }, []);


  let courseModules = [];
  modules.map((module) => {
    if (module.Course._id == cid ) {
        courseModules.push(module);
    }
  });

  courseModules.sort((a, b) => {
    // Convert titles to lowercase for case-insensitive sorting
    let titleA = a.Title.toLowerCase();
    let titleB = b.Title.toLowerCase();
    
    // Compare titles
    if (titleA < titleB) return -1;
    if (titleA > titleB) return 1;
    return 0;
});

  console.log(courseModules);

  function setkeyvalue(e) {
    setKey(e.eventKey);
  }

const dropOut = async () => {
  try {
    console.log(course.EnrolledStudents);
    let newEnrolled = [];
    newEnrolled = course.EnrolledStudents.filter(student => student._id !== user._id);
    console.log(newEnrolled);

    const reqBody = { 
      Title : course.Title,
      Description : course.Description,
      Instructor : course.Instructor,
      EnrolledStudents : newEnrolled,
      Modules : course.Modules
    }

    const response = await fetch(`http://localhost:8000/api/courses/${cid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody),
      credentials: 'include', // Ensure cookies are included with the request
    });

    if (response.ok) {
      const data = await response.json();
      // console.log(data)
      navigate(`/enrolled/${user._id}`)
    } else {
      console.log('Unable to Dropout');
    }
  } catch (error) {
    console.log('Unable to execute Dropout Functionality', error);
  }
}

  return (
    <>
      <Row>
        <Col className="col-8">
          <Container className="p-5">
            <div className="border border-1 border-secondary">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                transition={true}
                onSelect={(k) => setKey(k)}
                className="mb-3 text-bg-light"
                justify
              >
                {courseModules.map((module) => (
                  <Tab
                    eventKey={module.Title}
                    className="p-3"
                    onClick={setkeyvalue}
                    title={module.Title}
                  >
                    <h3>{ module.Content }</h3>
                    <h3>Assignments :</h3>
                    <p>No Assignments Yet</p>
                  </Tab>
                ))}
              </Tabs>
            </div>
          </Container>
        </Col>
        <Col className="pe-5 py-5">
        { course != null && <Card className="rounded-0 m-0 w-100">
              <Card.Img className="rounded-0" variant="top" src="/imgs/1.png" />
              <Card.Body>
                <Card.Title>{course.Title}</Card.Title> 
                <Card.Text>{course.Description}</Card.Text>
                <Button onClick={dropOut} className=" w-100 p-3 rounded-0" variant="outline-danger">
                  Drop Out
                </Button>
              </Card.Body>
            </Card> }
        </Col>
      </Row>
    </>
  );
}

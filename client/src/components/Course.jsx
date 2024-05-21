import { useEffect, useState } from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

export default function Course() {
  console.log("Reached Course");
  const [key, setKey] = useState("home");
  const [modules, setModules] = useState([]);
  const location = useLocation();
  const { cid } = useParams();

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

    fetchModules();
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
        <Col>
          
        </Col>
      </Row>
    </>
  );
}

import AdminHeader from "../static/AdminHeader";
import Footer from "../static/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { Row , Col , Container, Button ,ButtonGroup } from "react-bootstrap";

export default function MainLayout() {

    const navigate = useNavigate();

    const manageUsers = ()=> {
        navigate('dashboard/users');
    }
    const manageCourses = ()=> {
        navigate('dashboard/courses');
    }
    const manageAssignment = ()=> {
        navigate('dashboard/assignments');
    }
    const manageModules = ()=> {
        navigate('dashboard/modules');
    }
    return (
    <>
      <AdminHeader />
      <Row className="m-5">
        <Col className="col-2">
        <ButtonGroup className="w-100" vertical>
      <Button variant="outline-dark" onClick={manageUsers} className="mb-3 border-2 p-3 rounded-0">Manage Users</Button>
      <Button variant="outline-dark" onClick={manageCourses} className="mb-3 border-2 p-3 rounded-0">Manage Courses</Button>
      <Button variant="outline-dark" onClick={manageModules} className="mb-3 border-2 p-3 rounded-0">Manage Modules</Button>
      <Button variant="outline-dark" onClick={manageAssignment} className="mb-3 border-2 p-3 rounded-0">Manage Assignments</Button>
    </ButtonGroup>
        </Col>
        <Col className="col-9">
            <Outlet/>
        </Col>
      </Row>
      <Footer />
    </>
  );
}

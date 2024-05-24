
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import MainLayout from './components/layout/MainLayout';
import ListCourses from './components/ListCourses';
import Course from './components/Course';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/layout/Dashboard';
import Users from './components/adminComponents/Users';
import Courses from './components/adminComponents/Courses';
import Modules from './components/adminComponents/Modules';
import Assignments from './components/adminComponents/Assignments';

function App() {
  return (
    <>
      <Routes>
          {/* <Route path='/' > */}
            <Route path='/admin' element={<AdminLogin />}></Route>
            <Route element={<Dashboard/>} >
              <Route path='/dashboard/users' element={<Users/>}></Route>
              <Route path='/dashboard/courses' element={ <Courses/> }/>
              <Route path='/dashboard/assignments' element={ <Assignments/> }/>
              <Route path='/dashboard/modules' element={ <Modules/> }/>
            </Route>
            <Route index  element={<Signup />} />
               <Route path='/login' element={<Login />} />
              <Route element={<MainLayout />} >
                <Route path='/home' element={<ListCourses />} />
                <Route path='/enrolled/:uid' element={<ListCourses />} />
                <Route path='/course/:cid' element={<Course/>} />
                {/* <Route path='/logout' element={<LogOut />} /> */}
              </Route>
          {/* </Route>
            <Route path='/admin/' element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path='home' element={<AdminHome />} />
              <Route path='teams' element={<ManageTeam />} />
              <Route path='tasks' element={<ManageTasks />} />
            </Route> */}
      </Routes>
    </>
  )
}

export default App

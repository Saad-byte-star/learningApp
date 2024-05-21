
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import MainLayout from './components/layout/MainLayout';
import ListCourses from './components/ListCourses';
import Course from './components/Course';
import { useState } from 'react';

function App() {
  
  const [token, setToken] = useState(localStorage.getItem("token") || '');

  return (
    <>
      <Routes>
          {/* <Route path='/' > */}
            <Route index  element={<Signup />} />
               <Route path='/login' element={<Login setToken={setToken} />} />
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

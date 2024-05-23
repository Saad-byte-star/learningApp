
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import MainLayout from './components/layout/MainLayout';
import ListCourses from './components/ListCourses';
import Course from './components/Course';
import { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/layout/Dashboard';

function App() {
  return (
    <>
      <Routes>
          {/* <Route path='/' > */}
            <Route path='/admin' element={<AdminLogin />}></Route>
            <Route path='/dashboard' element={<Dashboard/>} >
              <Route path='/users' element={ <Users/> }/>
              <Route path='/courses' element={ <Courses/> }/>
              <Route path='/assignments' element={ <Assignments/> }/>
              <Route path='/modules' element={ <Modules/> }/>
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

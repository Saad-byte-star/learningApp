const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const User = require('../models/user.model');
const Course = require('../models/course.model');
const Assignment = require('../models/assignment.model');
const Submission = require('../models/submission.model');
const Module = require('../models/module.model');


const CON_STR = process.env.CON_STR;

const connectDB = async () => { 
    try {
        await mongoose.connect(CON_STR);
        console.log("Connected to Database :) ");
    }
    catch(err){ 
        console.error(`Failed to Connect to DB :(  |  Error : ${err}`);
        throw err  
    }   
}

async function initUsers() {
    const users = [
      { Name: 'Saad Tariq', Email: 'saad123@mail.com', Password: '12345', Role: 'student' },
      { Name: 'David Mellon', Email: 'davidmellon@mail.com', Password: '12345', Role: 'instructor' },
      { Name: 'Bahadur Ali', Email: 'bahadurali123@mail.com', Password: '12345', Role: 'Student' }
    ];
    try {
        await Promise.all(users.map(async userData => {
          const user = new User(userData);
          await user.save();
          console.log(`User created: ${user.Name}`);
        }));
      } catch (error) {
        console.error(error.message);
      }
}

async function initCourses() {
  const courses = [
    { 
      Title: 'Web Development',
      Description: 'A Complete Course On Web Development using Latest Web Technologies',
      Instructor: '6641da27bd9457926a6d8016',
      EnrolledStudents: [ '6641da27bd9457926a6d8017' , '6641da27bd9457926a6d8015' ],
      Modules : []
    },
    { 
      Title: 'Graphics Design',
      Description: 'A Complete Course On Graphic Design encompassing Design Theory and Skills',
      Instructor: '6641da27bd9457926a6d8016',
      EnrolledStudents: [ '6641da27bd9457926a6d8017' , '6641da27bd9457926a6d8015' ],
      Modules : []
    }
  ];
  try {
      await Promise.all(courses.map(async courseData => {
        const course = new Course(courseData);
        await course.save();
        console.log(`Course created: ${course.Title}`);
      }));
    } catch (error) {
      console.error(error.message);
    }
}


async function initModules() {
  const modules = [
    { 
      Title: 'Week 1',
      Content: 'HTML , CSS , Bootstrap',
      Course: '6641dc3059bd673dbf883f77',
      Assignments: []
    },
    { 
      Title: 'Week 2',
      Content: 'JavaScript',
      Course: '6641dc3059bd673dbf883f77',
      Assignments: []
    },
    { 
      Title: 'Week 3',
      Content: 'Node JS , Express , MongoDB',
      Course: '6641dc3059bd673dbf883f77',
      Assignments: []
    },
    { 
      Title: 'Week 4',
      Content: 'REACT',
      Course: '6641dc3059bd673dbf883f77',
      Assignments: []
    },
    { 
      Title: 'Week 1',
      Content: 'Raster & Vector Graphics',
      Course: '6641dc3059bd673dbf883f78',
      Assignments: []
    },
    { 
      Title: 'Week 2',
      Content: 'Adobe Creative Suite',
      Course: '6641dc3059bd673dbf883f78',
      Assignments: []
    },
    { 
      Title: 'Week 3',
      Content: 'Canva and Online Tools',
      Course: '6641dc3059bd673dbf883f78',
      Assignments: []
    }
  ];
  try {
      await Promise.all(modules.map(async moduleData => {
        const module = new Module(moduleData);
        await module.save();
        console.log(`Module created: ${module.Title}  :  ${module.Content} In ${module.Course.Title} Course`);
      }));
    } catch (error) {
      console.error(error.message);
    }
}


async function initAssignments() {
  const assignments = [
    { 
      Title: 'Assignment 1',
      Module: '6641df3ed42d647dab3e7843',
      Description: 'Make a CV document Using HTML, CSS, Bootstrap',
      DueDate: new Date('2024-05-20'), // Due date for the assignment
      Submissions: []
    },
    { 
      Title: 'Assignment 1',
      Module: '6641df3ed42d647dab3e7845',
      Description: 'Make a Backend for Task Management App',
      DueDate: new Date('2024-05-27'), // Due date for the assignment
      Submissions: []
    },
    { 
      Title: 'Assignment 1',
      Module: '6641df3ed42d647dab3e7847',
      Description: 'Make a Cartoon in Vector Graphics',
      DueDate: new Date('2024-05-18'), // Due date for the assignment
      Submissions: []
    },
  ];
  try {
      await Promise.all(assignments.map(async assignmentData => {
        const assignment = new Assignment(assignmentData);
        await assignment.save();
        console.log(`Assignment created: ${assignment.Title}  :  ${assignment.Description} In ${assignment.Module.Title} Module`);
      }));
    } catch (error) {
      console.error(error.message);
    }
}



module.exports = { connectDB , initUsers , initCourses , initModules , initAssignments };
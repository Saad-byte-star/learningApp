const express = require("express");
const courseRouter = express.Router();
const {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
  }
   = require("../dal/course.dal");

courseRouter.route("/")
  .get(getCourses)
  .post(addCourse);


courseRouter.route("/:id")
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

 
module.exports = courseRouter

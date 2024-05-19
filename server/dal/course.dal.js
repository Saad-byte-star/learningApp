const Course = require("../models/course.model");

async function getCourses(req, res) {
  try {
    const studentId = req.query["studentId"];
    const instructorId = req.query["instructorId"];
    const queryObject = {};
    if (studentId) {
      queryObject.EnrolledStudents = studentId;
    }
    if (instructorId) {
      queryObject.Instructor = instructorId;
    }
   
    const courses = await Course.find(queryObject)
      .populate("Instructor")
      .populate("EnrolledStudents")
      .populate("Modules")
    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get all courses " });
  }
}

async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId)
    .populate("Instructor")
      .populate("EnrolledStudents")
      .populate("Modules")
    return res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to get course" });
  }
}

async function addCourse(req, res) {
  try {
    const { Title, Description, Instructor, EnrolledStudents,Modules} = req.body;
    const created = await Course.create({ Title,  Description, Instructor, EnrolledStudents,Modules });
    res.header("location", `${req.originalUrl}/${created._id}`);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to add Course" });
  }
}

async function updateCourse(req, res) {
  try {
    const courseId = req.params.id;
    const { Title, Description, Instructor, EnrolledStudents,Modules} = req.body;
    const updated = await Course.findByIdAndUpdate(courseId, { Title, Description, Instructor, EnrolledStudents,Modules }, { new: true });
    if (!updated) return res.status(404).json({ message: `failed to update Course because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update course" });
  }
}

async function deleteCourse(req, res) {
  try {
    const courseId = req.params.id;
    const deleted = await Task.findByIdAndDelete(courseId);
    if (!deleted) return res.status(404).json({ message: `failed to delete course because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: `failed to delete course` });
  }
}

module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse
};

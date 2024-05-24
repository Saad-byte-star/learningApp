const express = require("express");
const assignmentRouter = express.Router();
const {
    getAssignments,
    getAssignment,
    addAssignment,
    updateAssignment,
    deleteAssignment
  } = require("../dal/assignment.dal");

assignmentRouter.route("/")
  .get(getAssignments)
  .post(addAssignment);

assignmentRouter.route("/:id")
  .get(getAssignment)
  .put(updateAssignment)
  .delete(deleteAssignment);

module.exports = assignmentRouter;

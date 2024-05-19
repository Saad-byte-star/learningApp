const express = require("express");
const submissionRouter = express.Router();
const {
    getSubmissions,
    getSubmission,
    addSubmission,
    updateSubmission,
    deleteSubmission
 } = require("../dal/submission.dal");

submissionRouter.route("/")
  .get(getSubmissions)
  .post(addSubmission);

submissionRouter.route("/:id")
  .get(getSubmission)
  .put(updateSubmission)
  .delete(deleteSubmission);

module.exports = submissionRouter;

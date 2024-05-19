const Submission = require("../models/submission.model");

async function getSubmissions(req, res) {

  try {
    const studentId = req.query["studentId"];
    const assignmentId = req.query["assignmentId"];
    const queryObject = {};
    if (studentId) {
      queryObject.Student= studentId;
    }
    const submissions = await Submission.find(queryObject)
      .populate("Students")
      .populate('Assignment')
    return res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get all submissions " });
  }
}

async function getSubmission(req, res) {
  try {
    const submissionId = req.params.id;
    const submission = await Submission.findById(submissionId)
    .populate("Students")
      .populate('Assignment')
    return res.status(200).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to get submission" });
  }
}

async function addSubmission(req, res) {
  try {
    const { Assignment, Student , Content , SubmittedAt , Grade } = req.body;
    const created = await Submission.create({ Assignment, Student , Content , SubmittedAt , Grade });
    res.header("location", `${req.originalUrl}/${created._id}`);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to add Submission" });
  }
}

async function updateSubmission(req, res) {
  try {
    const submissionId = req.params.id;
    const { Assignment, Student , Content , SubmittedAt , Grade } = req.body;
    const updated = await Submission.findByIdAndUpdate(submissionId,{ Assignment, Student , Content , SubmittedAt , Grade } , { new: true });
    if (!updated) return res.status(404).json({ message: `failed to update submission because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update submission" });
  }
}

async function deleteSubmission(req, res) {
  try {
    const submissionId = req.params.id;
    const deleted = await Submission.findByIdAndDelete(submissionId);
    if (!deleted) return res.status(404).json({ message: `failed to delete submission because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: `failed to delete submission` });
  }
}

module.exports = {
  getSubmissions,
  getSubmission,
  addSubmission,
  updateSubmission,
  deleteSubmission
};

const Assignment = require("../models/assignment.model");

async function getAssignments(req, res) {

  try {
    const moduleId = req.query["moduleId"];
    const queryObject = {};
    if (moduleId) {
      queryObject.Module = moduleId;
    }
    const assignments = await Assignment.find(queryObject)
      .populate("Module")
      .populate("Submissions")
    return res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get all assignments " });
  }
}

async function getAssignment(req, res) {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findById(assignmentId)
    .populate("Submissions")
    .populate("Module")
    return res.status(200).json(assignment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to get assignment" });
  }
}

async function addAssignment(req, res) {
  try {
    const { Title, Module , Description, DueDate, Submissions } = req.body;
    const created = await Assignment.create({ Title, Module , Description, DueDate, Submissions });
    res.header("location", `${req.originalUrl}/${created._id}`);
    return res.status(201).json(created);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to add Assignment" });
  }
}

async function updateAssignment(req, res) {
  try {
    const assignmentId = req.params.id;
    const { Title, Module , Description, DueDate, Submissions } = req.body;
    const updated = await Assignment.findByIdAndUpdate(assignmentId,{ Title, Module , Description, DueDate, Submissions } , { new: true });
    if (!updated) return res.status(404).json({ message: `failed to update assignment because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "failed to update assignment" });
  }
}

async function deleteAssignment(req, res) {
  try {
    const assignmentId = req.params.id;
    const deleted = await Assignment.findByIdAndDelete(assignmentId);
    if (!deleted) return res.status(404).json({ message: `failed to delete assignment because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: `failed to delete assignment` });
  }
}

module.exports = {
  getAssignments,
  getAssignment,
  addAssignment,
  updateAssignment,
  deleteAssignment
};

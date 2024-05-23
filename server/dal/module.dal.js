const Module = require("../models/module.model");

async function getAllModule(req, res) {
  try {
    const courseId = req.query["courseId"];
    const queryObject = {};
    if (courseId) {
      queryObject.Course = courseId;
    }
    const modules = await Module.find(queryObject)
    .populate('Course')
    .populate('Assignments');
    return res.status(200).json(modules);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get all modules " });
  }
}

async function getModule(req, res) {
    try 
  {
    const moduleId = req.params.id;
    const module = await Module.findById(moduleId)
    .populate('Course')
    .populate('Assignments');
    return res.status(200).json(module);
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to get module" });    
  }
}

async function addModule(req, res) {
  try {
    const { Title , Content , Course , Assignments } = req.body;
    const module = await Module.create({ Title , Content , Course , Assignments });
    // res.header("location",`${req.originalUrl}/${priorty._id}`);
    return res.status(201).json(module);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to add module" });
  }
}

async function updateModule(req, res) {
  try {
    const moduleId = req.params.id;
    const { Title , Content , Course , Assignments } = req.body;
    const updated = await Module.findByIdAndUpdate(moduleId,{ Title , Content , Course , Assignments },{new:true});
    if (!updated) return res.status(404).json({ message: `failed to update module because it is not found` });
    return res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to update module" });
  }
}

async function deleteModule(req, res) {
  try {
    const moduleId = req.params.id;
    const deleted = await Module.findByIdAndDelete(moduleId);
    if (!deleted) return res.status(404).json({ message: `failed to delete module because it is not found` });
    return res.status(200).json(deleted);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: `Failed to delete module` });
  }
}

module.exports = { 
  getAllModule, 
  getModule, 
  addModule, 
  updateModule, 
  deleteModule 
}
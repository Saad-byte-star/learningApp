const express = require("express");
const moduleRouter = express.Router();
const { 
    getAllModule, 
    getModule, 
    addModule, 
    updateModule, 
    deleteModule 
  } = require("../dal/module.dal");

moduleRouter.route("/")
  .get(getAllModule)
  .post(addModule);

moduleRouter.route("/:id")
  .get(getModule)
  .put(updateModule)
  .delete(deleteModule);

module.exports = moduleRouter;

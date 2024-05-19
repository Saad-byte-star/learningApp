const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
  Submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
  }],
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment; 
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  Assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Content: {
    type: String, // Can be a path to the uploaded file or the actual content depending on your storage strategy
    required: true,
  },
  SubmittedAt: {
    type: Date,
    default: Date.now,
  },
  Grade: {
    type: mongoose.Schema.Types.String,
  },
});
const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission ;
import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;

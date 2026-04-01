const mongoose = require('mongoose');

const instructionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Syllabus', 'Lesson Plan', 'Curriculum', 'Training Module'], required: true },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  department: { type: String, required: true },
  program: { type: String, required: true },
  yearLevel: { type: Number, required: true },
  semester: { type: String, required: true },
  academicYear: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  learningOutcomes: [{ type: String }],
  topics: [{
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    order: { type: Number }
  }],
  assessmentMethods: [{
    type: { type: String, enum: ['Quiz', 'Exam', 'Project', 'Presentation', 'Assignment', 'Lab Activity'], required: true },
    title: { type: String, required: true },
    description: { type: String },
    weight: { type: Number, required: true },
    schedule: { type: Date }
  }],
  resources: [{
    title: { type: String, required: true },
    type: { type: String, enum: ['Textbook', 'Reference', 'Website', 'Video', 'Software', 'Equipment'], required: true },
    description: { type: String },
    url: { type: String },
    author: { type: String }
  }],
  prerequisites: [{ type: String }],
  corequisites: [{ type: String }],
  credits: { type: Number, required: true },
  contactHours: {
    lecture: { type: Number, default: 0 },
    laboratory: { type: Number, default: 0 },
    tutorial: { type: Number, default: 0 }
  },
  status: { type: String, enum: ['Draft', 'Review', 'Approved', 'Archived'], default: 'Draft' },
  version: { type: String, default: '1.0' },
  lastReviewed: { type: Date },
  reviewCommittee: [{ type: String }],
  attachments: [{
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadDate: { type: Date, default: Date.now },
    url: { type: String }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better search performance
instructionSchema.index({ courseCode: 1, type: 1 });
instructionSchema.index({ department: 1, program: 1 });
instructionSchema.index({ author: 1 });
instructionSchema.index({ academicYear: 1, semester: 1 });

module.exports = mongoose.model('Instruction', instructionSchema);

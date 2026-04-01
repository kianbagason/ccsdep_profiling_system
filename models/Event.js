const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['Curricular', 'Extra-curricular'], required: true },
  category: { type: String, enum: ['Academic', 'Sports', 'Cultural', 'Technical', 'Leadership', 'Community Service', 'Competition', 'Workshop', 'Seminar'], required: true },
  description: { type: String, required: true },
  organizer: {
    name: { type: String, required: true },
    department: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true }
  },
  schedule: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timezone: { type: String, default: 'Asia/Manila' }
  },
  location: {
    venue: { type: String, required: true },
    address: { type: String },
    building: { type: String },
    room: { type: String },
    capacity: { type: Number, required: true }
  },
  participants: {
    targetAudience: [{ type: String, required: true }],
    currentParticipants: { type: Number, default: 0 },
    maxParticipants: { type: Number, required: true },
    waitlist: { type: Number, default: 0 },
    requirements: [{ type: String }],
    registrationDeadline: { type: Date }
  },
  details: {
    isRequired: { type: Boolean, default: false },
    isMandatory: { type: Boolean, default: false },
    credits: { type: Number, default: 0 },
    fee: { type: Number, default: 0 },
    dressCode: { type: String },
    equipment: [{ type: String }],
    materials: [{ type: String }]
  },
  resources: {
    budget: { type: Number },
    sponsors: [{ type: String }],
    partners: [{ type: String }],
    volunteers: [{ type: String }],
    attachments: [{
      filename: { type: String, required: true },
      originalName: { type: String, required: true },
      mimeType: { type: String, required: true },
      size: { type: Number, required: true },
      uploadDate: { type: Date, default: Date.now },
      url: { type: String }
    }]
  },
  status: { type: String, enum: ['Planning', 'Upcoming', 'In Progress', 'Completed', 'Cancelled', 'Postponed'], default: 'Planning' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  visibility: { type: String, enum: ['Public', 'Department', 'Program', 'Invitation Only'], default: 'Department' },
  assessment: {
    feedbackRequired: { type: Boolean, default: false },
    certificateIssued: { type: Boolean, default: false },
    evaluationCriteria: [{ type: String }],
    outcomes: [{ type: String }]
  },
  socialMedia: {
    facebookEvent: { type: String },
    twitterHashtag: { type: String },
    instagramTag: { type: String },
    website: { type: String }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better search performance
eventSchema.index({ title: 1, type: 1 });
eventSchema.index({ category: 1, status: 1 });
eventSchema.index({ 'schedule.startDate': 1, 'schedule.endDate': 1 });
eventSchema.index({ 'organizer.department': 1 });
eventSchema.index({ 'participants.targetAudience': 1 });

module.exports = mongoose.model('Event', eventSchema);

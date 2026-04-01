const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  course: {
    code: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['Regular', 'Laboratory', 'Lecture'], required: true },
    credits: { type: Number, required: true },
    description: { type: String }
  },
  section: { type: String, required: true },
  faculty: {
    name: { type: String, required: true },
    employeeId: { type: String, required: true },
    department: { type: String, required: true }
  },
  schedule: {
    days: [{ type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true }],
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }
  },
  room: {
    building: { type: String, required: true },
    roomNumber: { type: String, required: true },
    type: { type: String, enum: ['Classroom', 'Laboratory', 'Lecture Hall', 'Computer Lab'], required: true },
    capacity: { type: Number, required: true },
    equipment: [{ type: String }]
  },
  enrollment: {
    current: { type: Number, default: 0 },
    maximum: { type: Number, required: true },
    waitlist: { type: Number, default: 0 }
  },
  academicDetails: {
    yearLevel: { type: Number, required: true },
    semester: { type: String, required: true },
    academicYear: { type: String, required: true },
    program: { type: String, required: true },
    department: { type: String, required: true }
  },
  prerequisites: [{ type: String }],
  corequisites: [{ type: String }],
  status: { type: String, enum: ['Open', 'Closed', 'Cancelled', 'Completed'], default: 'Open' },
  remarks: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better search performance
scheduleSchema.index({ 'course.code': 1, section: 1 });
scheduleSchema.index({ 'faculty.employeeId': 1 });
scheduleSchema.index({ 'schedule.days': 1 });
scheduleSchema.index({ 'academicDetails.semester': 1, 'academicDetails.academicYear': 1 });
scheduleSchema.index({ 'room.building': 1, 'room.roomNumber': 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);

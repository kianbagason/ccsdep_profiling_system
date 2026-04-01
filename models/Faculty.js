const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    suffix: { type: String },
    birthDate: { type: Date, required: true },
    age: { type: Number },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    civilStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], required: true },
    citizenship: { type: String, required: true },
    religion: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      barangay: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      zipCode: { type: String, required: true }
    }
  },
  employmentDetails: {
    employeeId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    rank: { type: String, enum: ['Instructor', 'Assistant Professor', 'Associate Professor', 'Professor'], required: true },
    status: { type: String, enum: ['Full-time', 'Part-time', 'Visiting', 'Adjunct'], required: true },
    hireDate: { type: Date, required: true },
    specialization: [{ type: String }],
    loadUnits: { type: Number, default: 0 },
    office: { type: String },
    consultationHours: { type: String }
  },
  educationalBackground: {
    doctoral: {
      degree: { type: String },
      university: { type: String },
      year: { type: Number },
      thesis: { type: String }
    },
    masters: {
      degree: { type: String },
      university: { type: String },
      year: { type: Number },
      thesis: { type: String }
    },
    bachelors: {
      degree: { type: String, required: true },
      university: { type: String, required: true },
      year: { type: Number, required: true },
      honors: { type: String }
    }
  },
  certifications: [{
    name: { type: String, required: true },
    issuingOrganization: { type: String, required: true },
    dateObtained: { type: Date, required: true },
    expiryDate: { type: Date },
    credentialId: { type: String }
  }],
  researchInterests: [{ type: String }],
  publications: [{
    title: { type: String, required: true },
    type: { type: String, enum: ['Journal Article', 'Conference Paper', 'Book Chapter', 'Book'], required: true },
    publication: { type: String, required: true },
    year: { type: Number, required: true },
    authors: [{ type: String }],
    doi: { type: String },
    url: { type: String }
  }],
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better search performance
facultySchema.index({ 'personalInfo.firstName': 1, 'personalInfo.lastName': 1 });
facultySchema.index({ 'employmentDetails.employeeId': 1 });
facultySchema.index({ 'employmentDetails.department': 1 });
facultySchema.index({ 'employmentDetails.specialization': 1 });

module.exports = mongoose.model('Faculty', facultySchema);

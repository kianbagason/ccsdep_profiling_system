const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
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
  },
  emergencyContact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true }
  }
});

const academicHistorySchema = new mongoose.Schema({
  elementary: {
    schoolName: { type: String, required: true },
    address: { type: String, required: true },
    yearGraduated: { type: Number, required: true },
    honors: { type: String }
  },
  juniorHigh: {
    schoolName: { type: String, required: true },
    address: { type: String, required: true },
    yearGraduated: { type: Number, required: true },
    honors: { type: String }
  },
  seniorHigh: {
    schoolName: { type: String, required: true },
    address: { type: String, required: true },
    strand: { type: String, required: true },
    yearGraduated: { type: Number, required: true },
    honors: { type: String }
  },
  college: {
    schoolName: { type: String },
    degree: { type: String },
    course: { type: String },
    yearLevel: { type: Number },
    expectedGraduation: { type: Date },
    gwa: { type: Number },
    honors: { type: String }
  }
});

const currentEnrollmentSchema = new mongoose.Schema({
  studentId: { 
  type: String, 
  required: true, 
  unique: true,
  validate: {
    validator: function(v) {
      return /^[0-9]{7}$/.test(v);
    },
    message: 'Student ID must be exactly 7 digits (e.g., 2203334)'
  }
},
  program: { type: String, required: true },
  major: { type: String },
  yearLevel: { type: Number, required: true },
  section: { type: String, required: true },
  semester: { type: String, required: true },
  academicYear: { type: String, required: true },
  enrollmentStatus: { type: String, enum: ['Regular', 'Irregular', 'Transferee', 'Returnee'], required: true },
  scholarship: { type: String },
  adviser: { type: String }
});

const nonAcademicActivitiesSchema = new mongoose.Schema({
  sports: [{
    sportName: { type: String, required: true },
    position: { type: String },
    achievements: [{ type: String }],
    yearsPlayed: [{ type: Number }]
  }],
  arts: [{
    artType: { type: String, enum: ['Music', 'Dance', 'Theater', 'Visual Arts', 'Literature'], required: true },
    description: { type: String },
    achievements: [{ type: String }],
    yearsActive: [{ type: Number }]
  }],
  leadership: [{
    position: { type: String, required: true },
    organization: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    achievements: [{ type: String }]
  }],
  communityService: [{
    activity: { type: String, required: true },
    organization: { type: String, required: true },
    date: { type: Date, required: true },
    hours: { type: Number, required: true }
  }]
});

const violationsSchema = new mongoose.Schema({
  disciplinaryRecords: [{
    violationType: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    severity: { type: String, enum: ['Minor', 'Major', 'Grave'], required: true },
    sanction: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Resolved', 'Appealed'], required: true },
    resolutionDate: { type: Date }
  }]
});

const skillsSchema = new mongoose.Schema({
  technicalSkills: [{
    skillName: { type: String, required: true },
    proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
    certification: { type: String },
    dateObtained: { type: Date }
  }],
  softSkills: [{
    skillName: { type: String, required: true },
    proficiency: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
    description: { type: String }
  }],
  languages: [{
    language: { type: String, required: true },
    proficiency: { type: String, enum: ['Basic', 'Conversational', 'Fluent', 'Native'], required: true },
    certification: { type: String }
  }]
});

const affiliationsSchema = new mongoose.Schema({
  organizations: [{
    orgName: { type: String, required: true },
    position: { type: String },
    type: { type: String, enum: ['Academic', 'Professional', 'Cultural', 'Sports', 'Religious', 'Community'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    achievements: [{ type: String }]
  }],
  sportsTeams: [{
    teamName: { type: String, required: true },
    sport: { type: String, required: true },
    position: { type: String },
    achievements: [{ type: String }],
    yearsActive: [{ type: Number }]
  }],
  clubs: [{
    clubName: { type: String, required: true },
    role: { type: String },
    type: { type: String, enum: ['Academic', 'Interest', 'Service', 'Honor'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    achievements: [{ type: String }]
  }]
});

const medicalInfoSchema = new mongoose.Schema({
  bloodType: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  allergies: [{ type: String }],
  medicalConditions: [{ type: String }],
  medications: [{ type: String }],
  physician: {
    name: { type: String },
    contact: { type: String }
  },
  hospital: {
    name: { type: String },
    address: { type: String }
  }
});

const studentSchema = new mongoose.Schema({
  personalInfo: { type: personalInfoSchema, required: true },
  academicHistory: { type: academicHistorySchema, required: true },
  currentEnrollment: { type: currentEnrollmentSchema, required: true, unique: true },
  nonAcademicActivities: { type: nonAcademicActivitiesSchema },
  violations: { type: violationsSchema },
  skills: { type: skillsSchema },
  affiliations: { type: affiliationsSchema },
  medicalInfo: { type: medicalInfoSchema },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better search performance
studentSchema.index({ 'personalInfo.firstName': 1, 'personalInfo.lastName': 1 });
studentSchema.index({ 'currentEnrollment.studentId': 1 });
studentSchema.index({ 'skills.technicalSkills.skillName': 1 });
studentSchema.index({ 'affiliations.organizations.orgName': 1 });
studentSchema.index({ 'nonAcademicActivities.sports.sportName': 1 });

module.exports = mongoose.model('Student', studentSchema);

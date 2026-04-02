const mongoose = require('mongoose');
const Faculty = require('./models/Faculty');
const Instruction = require('./models/Instruction');
const Schedule = require('./models/Schedule');
const Event = require('./models/Event');
require('dotenv').config();

const sampleFaculty = [
  {
    personalInfo: {
      firstName: 'Jose',
      lastName: 'Reyes',
      middleName: 'Santos',
      birthDate: new Date('1980-05-15'),
      age: 44,
      gender: 'Male',
      civilStatus: 'Married',
      citizenship: 'Filipino',
      religion: 'Roman Catholic',
      email: 'jose.reyes@pnc.edu.ph',
      phone: '+639123456789',
      address: {
        street: '456 University Avenue',
        barangay: 'Barangay 3',
        city: 'Cabuyao',
        province: 'Laguna',
        zipCode: '4025'
      },
      emergencyContact: {
        name: 'Maria Reyes',
        relationship: 'Spouse',
        phone: '+639987654321'
      }
    },
    employmentDetails: {
      employeeId: 'FAC-001',
      department: 'Computer System Servicing',
      position: 'Professor',
      rank: 'Professor',
      status: 'Full-time',
      specialization: 'Network Security',
      office: 'Room 201, CCS Building',
      hireDate: new Date('2010-06-01')
    },
    educationalBackground: {
      doctoral: {
        degree: 'PhD in Computer Science',
        university: 'University of the Philippines',
        year: '2008',
        thesis: 'Advanced Network Security Protocols'
      },
      masters: {
        degree: 'MS in Information Technology',
        university: 'De La Salle University',
        year: '2004',
        thesis: 'Network Infrastructure Design'
      },
      bachelors: {
        degree: 'BS in Computer Science',
        university: 'University of Santo Tomas',
        year: '2000',
        honors: 'Cum Laude'
      }
    },
    certifications: [
      {
        name: 'Cisco Certified Network Professional (CCNP)',
        issuingOrganization: 'Cisco Systems',
        dateObtained: new Date('2015-03-15'),
        expiryDate: new Date('2025-03-15')
      },
      {
        name: 'CompTIA Security+',
        issuingOrganization: 'CompTIA',
        dateObtained: new Date('2018-06-20'),
        expiryDate: null
      }
    ],
    researchInterests: [
      'Network Security',
      'Cybersecurity',
      'Information Assurance',
      'Network Protocols'
    ],
    publications: [
      {
        title: 'Advanced Network Security in Educational Institutions',
        type: 'Journal Article',
        publication: 'Journal of Computer Security',
        year: 2019,
        authors: ['Jose Reyes', 'Maria Santos'],
        doi: '10.1234/jcs.2019.001'
      },
      {
        title: 'Cybersecurity Awareness in Higher Education',
        type: 'Conference Paper',
        publication: 'International Conference on IT Education',
        year: 2020,
        authors: ['Jose Reyes', 'Roberto Cruz'],
        doi: '10.5678/icite.2020.001'
      }
    ]
  },
  {
    personalInfo: {
      firstName: 'Ana',
      lastName: 'Cruz',
      middleName: 'Garcia',
      birthDate: new Date('1985-08-22'),
      age: 39,
      gender: 'Female',
      civilStatus: 'Single',
      citizenship: 'Filipino',
      religion: 'Roman Catholic',
      email: 'ana.cruz@pnc.edu.ph',
      phone: '+639234567890',
      address: {
        street: '789 College Street',
        barangay: 'Barangay 5',
        city: 'Cabuyao',
        province: 'Laguna',
        zipCode: '4025'
      },
      emergencyContact: {
        name: 'Roberto Cruz',
        relationship: 'Father',
        phone: '+639345678901'
      }
    },
    employmentDetails: {
      employeeId: 'FAC-002',
      department: 'Computer System Servicing',
      position: 'Associate Professor',
      rank: 'Associate Professor',
      status: 'Full-time',
      specialization: 'Database Management',
      office: 'Room 202, CCS Building',
      hireDate: new Date('2012-08-15')
    },
    educationalBackground: {
      doctoral: {
        degree: 'PhD in Information Technology',
        university: 'Ateneo de Manila University',
        year: '2010',
        thesis: 'Database Optimization Techniques'
      },
      masters: {
        degree: 'MS in Computer Science',
        university: 'University of the Philippines',
        year: '2006',
        thesis: 'Advanced Database Systems'
      },
      bachelors: {
        degree: 'BS in Information Technology',
        university: 'Ateneo de Manila University',
        year: '2002',
        honors: 'Magna Cum Laude'
      }
    },
    certifications: [
      {
        name: 'Oracle Certified Professional',
        issuingOrganization: 'Oracle Corporation',
        dateObtained: new Date('2014-11-10'),
        expiryDate: new Date('2024-11-10')
      },
      {
        name: 'MongoDB Certified Developer',
        issuingOrganization: 'MongoDB Inc.',
        dateObtained: new Date('2019-02-15'),
        expiryDate: null
      }
    ],
    researchInterests: [
      'Database Systems',
      'Big Data Analytics',
      'Data Mining',
      'Database Security'
    ],
    publications: [
      {
        title: 'Optimizing Database Performance in Cloud Computing',
        type: 'Journal Article',
        publication: 'International Journal of Database Management',
        year: 2018,
        authors: ['Ana Cruz', 'Jose Reyes'],
        doi: '10.5678/ijdm.2018.002'
      }
    ]
  }
];

const sampleInstruction = [
  {
    title: 'Introduction to Computer Systems',
    type: 'Syllabus',
    courseCode: 'CCS101',
    courseTitle: 'Computer System Servicing Fundamentals',
    author: 'Jose Reyes',
    department: 'Computer System Servicing',
    program: 'BSIT',
    yearLevel: 1,
    academicYear: '2024-2025',
    semester: 'First Semester',
    credits: 3,
    description: 'Fundamental concepts of computer systems and servicing',
    learningOutcomes: [
      'Understand basic computer system components',
      'Identify hardware and software interactions',
      'Learn troubleshooting techniques',
      'Master system maintenance procedures'
    ],
    topics: [
      {
        title: 'Computer Hardware Overview',
        description: 'Introduction to computer hardware components',
        duration: '2 weeks',
        order: 1
      },
      {
        title: 'Operating Systems Fundamentals',
        description: 'Basic operating system concepts',
        duration: '3 weeks',
        order: 2
      }
    ],
    assessmentMethods: [
      {
        type: 'Quiz',
        title: 'Midterm Quiz',
        description: 'Written examination on hardware concepts',
        weight: 20,
        schedule: new Date('2024-10-15')
      },
      {
        type: 'Project',
        title: 'Final Project',
        description: 'Hands-on system assembly project',
        weight: 30,
        schedule: new Date('2024-12-01')
      }
    ],
    resources: [
      {
        title: 'Computer Systems Essentials',
        type: 'Textbook',
        description: 'Primary textbook for the course',
        author: 'Various Authors'
      },
      {
        title: 'Diagnostic Tools Software',
        type: 'Software',
        description: 'Software tools for system diagnostics'
      }
    ],
    attachments: [
      {
        filename: 'CCS101_Syllabus.pdf',
        originalName: 'CCS101_Syllabus.pdf',
        mimeType: 'application/pdf',
        size: 2621440,
        uploadDate: new Date('2024-06-01')
      }
    ]
  },
  {
    title: 'Network Security Fundamentals',
    type: 'Lesson Plan',
    courseCode: 'CCS201',
    courseTitle: 'Network Security and Protection',
    author: 'Jose Reyes',
    department: 'Computer System Servicing',
    program: 'BSIT',
    yearLevel: 2,
    academicYear: '2024-2025',
    semester: 'First Semester',
    credits: 4,
    description: 'Introduction to network security principles and practices',
    learningOutcomes: [
      'Understand network security principles',
      'Implement security protocols',
      'Identify security threats',
      'Develop security strategies'
    ],
    topics: [
      {
        title: 'Security Fundamentals',
        description: 'Basic security concepts and terminology',
        duration: '1 week',
        order: 1
      },
      {
        title: 'Encryption Techniques',
        description: 'Encryption and decryption methods',
        duration: '2 weeks',
        order: 2
      }
    ],
    assessmentMethods: [
      {
        type: 'Lab Activity',
        title: 'Security Lab Exercise',
        description: 'Hands-on security configuration',
        weight: 25,
        schedule: new Date('2024-10-20')
      }
    ],
    resources: [
      {
        title: 'Security Software Tools',
        type: 'Software',
        description: 'Software tools for security testing'
      }
    ],
    attachments: [
      {
        filename: 'CCS201_Lesson1.pdf',
        originalName: 'CCS201_Lesson1.pdf',
        mimeType: 'application/pdf',
        size: 1887436,
        uploadDate: new Date('2024-06-15')
      }
    ]
  }
];

const sampleSchedule = [
  {
    course: {
      code: 'CCS101',
      title: 'Computer System Servicing Fundamentals',
      type: 'Regular',
      credits: 3,
      description: 'Introduction to computer systems'
    },
    section: 'BSIT-1A',
    faculty: {
      name: 'Jose Reyes',
      employeeId: 'FAC-001',
      department: 'Computer System Servicing'
    },
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      startTime: '08:00',
      endTime: '09:30'
    },
    room: {
      building: 'CCS Building',
      roomNumber: 'Lab 101',
      type: 'Computer Lab',
      capacity: 30,
      equipment: ['Computers', 'Projector', 'Whiteboard']
    },
    enrollment: {
      current: 25,
      maximum: 30,
      waitlist: 0
    },
    academicDetails: {
      yearLevel: 1,
      academicYear: '2024-2025',
      semester: 'First Semester',
      program: 'BSIT',
      department: 'Computer System Servicing'
    }
  },
  {
    course: {
      code: 'CCS201',
      title: 'Network Security and Protection',
      type: 'Laboratory',
      credits: 4,
      description: 'Network security principles and practices'
    },
    section: 'BSIT-2A',
    faculty: {
      name: 'Jose Reyes',
      employeeId: 'FAC-001',
      department: 'Computer System Servicing'
    },
    schedule: {
      days: ['Tuesday', 'Thursday'],
      startTime: '10:00',
      endTime: '12:00'
    },
    room: {
      building: 'CCS Building',
      roomNumber: 'Lab 201',
      type: 'Computer Lab',
      capacity: 25,
      equipment: ['Computers', 'Network Equipment', 'Security Software']
    },
    enrollment: {
      current: 20,
      maximum: 25,
      waitlist: 0
    },
    academicDetails: {
      yearLevel: 2,
      academicYear: '2024-2025',
      semester: 'First Semester',
      program: 'BSIT',
      department: 'Computer System Servicing'
    }
  }
];

const sampleEvents = [
  {
    title: 'CCS Department Orientation',
    type: 'Curricular',
    category: 'Academic',
    description: 'Orientation program for new CCS students covering department policies, facilities tour, and academic expectations.',
    organizer: {
      name: 'Computer System Servicing Department',
      department: 'Computer System Servicing',
      contactPerson: 'Ana Cruz',
      contactEmail: 'ana.cruz@pnc.edu.ph',
      contactPhone: '+639234567890'
    },
    schedule: {
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-06-15'),
      startTime: '09:00',
      endTime: '12:00',
      timezone: 'Asia/Manila'
    },
    location: {
      venue: 'CCS Auditorium',
      building: 'CCS Building',
      address: 'Pamantasan ng Cabuyao',
      capacity: 100
    },
    participants: {
      targetAudience: ['First Year Students'],
      currentParticipants: 45,
      maxParticipants: 100,
      waitlist: 0,
      requirements: ['Student ID', 'Registration Form'],
      registrationDeadline: new Date('2024-06-10')
    }
  },
  {
    title: 'CCS Sports Festival 2024',
    type: 'Extra-curricular',
    category: 'Sports',
    description: 'Annual sports festival featuring basketball, volleyball, badminton, and other competitive sports.',
    organizer: {
      name: 'Student Affairs Office',
      department: 'Student Affairs',
      contactPerson: 'Roberto Santos',
      contactEmail: 'roberto.santos@pnc.edu.ph',
      contactPhone: '+639456789012'
    },
    schedule: {
      startDate: new Date('2024-09-20'),
      endDate: new Date('2024-09-22'),
      startTime: '08:00',
      endTime: '18:00',
      timezone: 'Asia/Manila'
    },
    location: {
      venue: 'University Sports Complex',
      building: 'Sports Building',
      address: 'Pamantasan ng Cabuyao',
      capacity: 200
    },
    participants: {
      targetAudience: ['All CCS Students'],
      currentParticipants: 120,
      maxParticipants: 200,
      waitlist: 0,
      requirements: ['Registration Fee', 'Medical Certificate'],
      registrationDeadline: new Date('2024-09-15')
    }
  }
];

async function populateAdditionalData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ccs_profiling_system');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Faculty.deleteMany({});
    await Instruction.deleteMany({});
    await Schedule.deleteMany({});
    await Event.deleteMany({});

    // Insert sample data
    await Faculty.insertMany(sampleFaculty);
    console.log('Faculty data inserted');

    await Instruction.insertMany(sampleInstruction);
    console.log('Instruction data inserted');

    await Schedule.insertMany(sampleSchedule);
    console.log('Schedule data inserted');

    await Event.insertMany(sampleEvents);
    console.log('Events data inserted');

    console.log('Additional data populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating data:', error);
    process.exit(1);
  }
}

populateAdditionalData();

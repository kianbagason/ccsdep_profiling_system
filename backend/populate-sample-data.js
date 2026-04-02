const mongoose = require('mongoose');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');
const Instruction = require('./models/Instruction');
const Schedule = require('./models/Schedule');
const Event = require('./models/Event');
require('dotenv').config();

const sampleStudents = [
  {
    personalInfo: {
      firstName: 'Juan',
      lastName: 'Santos',
      middleName: 'Cruz',
      birthDate: new Date('2002-05-15'),
      age: 22,
      gender: 'Male',
      civilStatus: 'Single',
      citizenship: 'Filipino',
      religion: 'Roman Catholic',
      email: 'juan.santos@example.com',
      phone: '+639123456789',
      address: {
        street: '123 Rizal Street',
        barangay: 'Barangay 1',
        city: 'Cabuyao',
        province: 'Laguna',
        zipCode: '4025'
      },
      emergencyContact: {
        name: 'Maria Santos',
        relationship: 'Mother',
        phone: '+639987654321'
      }
    },
    academicHistory: {
      elementary: {
        schoolName: 'Cabuyao Elementary School',
        address: 'Cabuyao, Laguna',
        yearGraduated: 2014,
        honors: 'With Honors'
      },
      juniorHigh: {
        schoolName: 'Cabuyao National High School',
        address: 'Cabuyao, Laguna',
        yearGraduated: 2018,
        honors: 'With Honors'
      },
      seniorHigh: {
        schoolName: 'Cabuyao Senior High School',
        address: 'Cabuyao, Laguna',
        strand: 'STEM',
        yearGraduated: 2020,
        honors: 'With High Honors'
      },
      college: {
        schoolName: 'Pamantasan ng Cabuyao',
        degree: 'Bachelor of Science in Information Technology',
        course: 'BSIT',
        yearLevel: 3,
        expectedGraduation: new Date('2025-06-30'),
        gwa: 1.75,
        honors: null
      }
    },
    currentEnrollment: {
      studentId: '2203334',
      program: 'BSIT',
      major: 'Web Development',
      yearLevel: 3,
      section: 'BSIT-3A',
      semester: 'First Semester',
      academicYear: '2024-2025',
      enrollmentStatus: 'Regular',
      scholarship: 'Academic Scholarship',
      adviser: 'Dr. Jose Reyes'
    },
    nonAcademicActivities: {
      sports: [{
        sportName: 'Basketball',
        position: 'Point Guard',
        achievements: ['MVP 2023', 'Best Player 2022'],
        yearsPlayed: [2021, 2022, 2023]
      }],
      arts: [{
        artType: 'Music',
        description: 'Guitar player for 5 years',
        achievements: ['Battle of the Bands 2022'],
        yearsActive: [2019, 2020, 2021, 2022, 2023]
      }],
      leadership: [{
        position: 'President',
        organization: 'IT Society',
        startDate: new Date('2023-06-01'),
        endDate: null,
        achievements: ['Best Organization 2023']
      }],
      communityService: [{
        activity: 'Coastal Cleanup',
        organization: 'Environmental Club',
        date: new Date('2023-09-15'),
        hours: 8
      }]
    },
    violations: {
      disciplinaryRecords: []
    },
    skills: {
      technicalSkills: [
        { skillName: 'JavaScript', proficiency: 'Advanced', certification: 'JavaScript Certification', dateObtained: new Date('2023-01-15') },
        { skillName: 'React', proficiency: 'Intermediate', certification: null, dateObtained: null },
        { skillName: 'Python', proficiency: 'Intermediate', certification: null, dateObtained: null },
        { skillName: 'Database Management', proficiency: 'Advanced', certification: 'MongoDB Certified Developer', dateObtained: new Date('2023-06-20') }
      ],
      softSkills: [
        { skillName: 'Leadership', proficiency: 'Advanced', description: 'Led multiple student organizations' },
        { skillName: 'Communication', proficiency: 'Advanced', description: 'Public speaking experience' },
        { skillName: 'Teamwork', proficiency: 'Advanced', description: 'Collaborative projects' }
      ],
      languages: [
        { language: 'Filipino', proficiency: 'Native', certification: null },
        { language: 'English', proficiency: 'Fluent', certification: 'IELTS 7.5' },
        { language: 'Japanese', proficiency: 'Basic', certification: null }
      ]
    },
    affiliations: {
      organizations: [{
        orgName: 'IT Society',
        position: 'President',
        type: 'Academic',
        startDate: new Date('2023-06-01'),
        endDate: null,
        achievements: ['Best Organization 2023']
      }],
      sportsTeams: [{
        teamName: 'Pamantasan ng Cabuyao Basketball Team',
        sport: 'Basketball',
        position: 'Point Guard',
        achievements: ['MVP 2023'],
        yearsActive: [2021, 2022, 2023]
      }],
      clubs: [{
        clubName: 'Programming Club',
        role: 'Member',
        type: 'Academic',
        startDate: new Date('2020-09-01'),
        endDate: null,
        achievements: ['Hackathon Winner 2022']
      }]
    },
    medicalInfo: {
      bloodType: 'O+',
      allergies: ['Peanuts'],
      medicalConditions: [],
      medications: [],
      physician: {
        name: 'Dr. Maria Santos',
        contact: '+639123456789'
      },
      hospital: {
        name: 'Cabuyao Medical Center',
        address: 'Cabuyao, Laguna'
      }
    }
  },
  {
    personalInfo: {
      firstName: 'Maria',
      lastName: 'Reyes',
      middleName: 'Garcia',
      birthDate: new Date('2003-03-22'),
      age: 21,
      gender: 'Female',
      civilStatus: 'Single',
      citizenship: 'Filipino',
      religion: 'Roman Catholic',
      email: 'maria.reyes@example.com',
      phone: '+639234567890',
      address: {
        street: '456 Mabini Street',
        barangay: 'Barangay 2',
        city: 'Cabuyao',
        province: 'Laguna',
        zipCode: '4025'
      },
      emergencyContact: {
        name: 'Carlos Reyes',
        relationship: 'Father',
        phone: '+639345678901'
      }
    },
    academicHistory: {
      elementary: {
        schoolName: 'Laguna Elementary School',
        address: 'Laguna',
        yearGraduated: 2015,
        honors: 'Valedictorian'
      },
      juniorHigh: {
        schoolName: 'Laguna National High School',
        address: 'Laguna',
        yearGraduated: 2019,
        honors: 'With Honors'
      },
      seniorHigh: {
        schoolName: 'Laguna Senior High School',
        address: 'Laguna',
        strand: 'ABM',
        yearGraduated: 2021,
        honors: 'With High Honors'
      },
      college: {
        schoolName: 'Pamantasan ng Cabuyao',
        degree: 'Bachelor of Science in Computer Science',
        course: 'BSCS',
        yearLevel: 2,
        expectedGraduation: new Date('2026-06-30'),
        gwa: 1.85,
        honors: null
      }
    },
    currentEnrollment: {
      studentId: '2203335',
      program: 'BSCS',
      major: 'Artificial Intelligence',
      yearLevel: 2,
      section: 'BSCS-2B',
      semester: 'First Semester',
      academicYear: '2024-2025',
      enrollmentStatus: 'Regular',
      scholarship: 'DOST Scholarship',
      adviser: 'Prof. Ana Cruz'
    },
    nonAcademicActivities: {
      sports: [{
        sportName: 'Volleyball',
        position: 'Setter',
        achievements: ['Best Setter 2023'],
        yearsPlayed: [2021, 2022, 2023]
      }],
      arts: [{
        artType: 'Dance',
        description: 'Contemporary dancer',
        achievements: ['Dance Competition Winner 2022'],
        yearsActive: [2020, 2021, 2022, 2023]
      }],
      leadership: [{
        position: 'Vice President',
        organization: 'Computer Science Society',
        startDate: new Date('2023-06-01'),
        endDate: null,
        achievements: ['Best Academic Organization 2023']
      }],
      communityService: [{
        activity: 'Teaching Basic Computer Skills',
        organization: 'Outreach Program',
        date: new Date('2023-10-20'),
        hours: 12
      }]
    },
    violations: {
      disciplinaryRecords: []
    },
    skills: {
      technicalSkills: [
        { skillName: 'Python', proficiency: 'Advanced', certification: 'Python Certified Associate', dateObtained: new Date('2023-03-10') },
        { skillName: 'Machine Learning', proficiency: 'Intermediate', certification: null, dateObtained: null },
        { skillName: 'Java', proficiency: 'Advanced', certification: 'Oracle Certified Professional', dateObtained: new Date('2023-07-15') },
        { skillName: 'Data Structures', proficiency: 'Advanced', certification: null, dateObtained: null }
      ],
      softSkills: [
        { skillName: 'Problem Solving', proficiency: 'Advanced', description: 'Algorithmic thinking' },
        { skillName: 'Analytical Thinking', proficiency: 'Advanced', description: 'Data analysis skills' },
        { skillName: 'Time Management', proficiency: 'Intermediate', description: 'Project management' }
      ],
      languages: [
        { language: 'Filipino', proficiency: 'Native', certification: null },
        { language: 'English', proficiency: 'Fluent', certification: 'TOEFL 95' },
        { language: 'Korean', proficiency: 'Basic', certification: null }
      ]
    },
    affiliations: {
      organizations: [{
        orgName: 'Computer Science Society',
        position: 'Vice President',
        type: 'Academic',
        startDate: new Date('2023-06-01'),
        endDate: null,
        achievements: ['Best Academic Organization 2023']
      }],
      sportsTeams: [{
        teamName: 'Pamantasan ng Cabuyao Volleyball Team',
        sport: 'Volleyball',
        position: 'Setter',
        achievements: ['Best Setter 2023'],
        yearsActive: [2021, 2022, 2023]
      }],
      clubs: [{
        clubName: 'AI Research Club',
        role: 'Member',
        type: 'Academic',
        startDate: new Date('2021-09-01'),
        endDate: null,
        achievements: ['Research Paper Published 2023']
      }]
    },
    medicalInfo: {
      bloodType: 'A+',
      allergies: ['Seafood'],
      medicalConditions: ['Asthma'],
      medications: ['Ventolin'],
      physician: {
        name: 'Dr. Jose Martinez',
        contact: '+639456789012'
      },
      hospital: {
        name: 'Laguna Medical Center',
        address: 'Laguna'
      }
    }
  }
];

// Add more sample students...
const generateMoreStudents = () => {
  const firstNames = ['Carlos', 'Ana', 'Jose', 'Patricia', 'Miguel', 'Sofia', 'Roberto', 'Isabella', 'Antonio', 'Carmela'];
  const lastNames = ['Garcia', 'Martinez', 'Lopez', 'Rodriguez', 'Cruz', 'Torres', 'Ramos', 'Flores', 'Bautista', 'Villanueva'];
  const programs = ['BSIT', 'BSCS', 'BSIS'];
  const sections = ['A', 'B', 'C'];
  
  const moreStudents = [];
  
  for (let i = 2; i < 10; i++) {
    const firstName = firstNames[i];
    const lastName = lastNames[i];
    const program = programs[i % 3];
    const section = sections[i % 3];
    
    moreStudents.push({
      personalInfo: {
        firstName: firstName,
        lastName: lastName,
        middleName: 'Dela Cruz',
        birthDate: new Date(2002 + (i % 3), (i % 12) + 1, (i % 28) + 1),
        age: 20 + (i % 3),
        gender: i % 2 === 0 ? 'Male' : 'Female',
        civilStatus: 'Single',
        citizenship: 'Filipino',
        religion: 'Roman Catholic',
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `+639${100000000 + i * 12345678}`,
        address: {
          street: `${123 + i * 100} University Street`,
          barangay: 'Barangay 3',
          city: 'Cabuyao',
          province: 'Laguna',
          zipCode: '4025'
        },
        emergencyContact: {
          name: `${lastName} Parent`,
          relationship: i % 2 === 0 ? 'Father' : 'Mother',
          phone: `+639${200000000 + i * 12345678}`
        }
      },
      academicHistory: {
        elementary: {
          schoolName: 'Cabuyao Elementary School',
          address: 'Cabuyao, Laguna',
          yearGraduated: 2014 + (i % 2),
          honors: i % 3 === 0 ? 'With Honors' : null
        },
        juniorHigh: {
          schoolName: 'Cabuyao National High School',
          address: 'Cabuyao, Laguna',
          yearGraduated: 2018 + (i % 2),
          honors: i % 4 === 0 ? 'With Honors' : null
        },
        seniorHigh: {
          schoolName: 'Cabuyao Senior High School',
          address: 'Cabuyao, Laguna',
          strand: ['STEM', 'ABM', 'HUMSS'][i % 3],
          yearGraduated: 2020 + (i % 2),
          honors: i % 5 === 0 ? 'With High Honors' : null
        },
        college: {
          schoolName: 'Pamantasan ng Cabuyao',
          degree: `Bachelor of Science in ${program}`,
          course: program,
          yearLevel: 1 + (i % 4),
          expectedGraduation: new Date(2025 + (i % 2), 5, 30),
          gwa: 1.5 + (i * 0.1),
          honors: null
        }
      },
      currentEnrollment: {
        studentId: `22033${String(i + 6).padStart(2, '0')}`,
        program: program,
        major: ['Web Development', 'AI', 'Database Systems'][i % 3],
        yearLevel: 1 + (i % 4),
        section: `${program}-${1 + (i % 4)}${section}`,
        semester: 'First Semester',
        academicYear: '2024-2025',
        enrollmentStatus: 'Regular',
        scholarship: i % 3 === 0 ? 'Academic Scholarship' : null,
        adviser: `Prof. ${['Reyes', 'Cruz', 'Santos', 'Garcia'][i % 4]}`
      },
      nonAcademicActivities: {
        sports: i % 3 === 0 ? [{
          sportName: ['Basketball', 'Volleyball', 'Badminton'][i % 3],
          position: 'Player',
          achievements: ['Team Player 2023'],
          yearsPlayed: [2021, 2022, 2023]
        }] : [],
        arts: i % 4 === 0 ? [{
          artType: ['Music', 'Dance', 'Theater', 'Visual Arts'][i % 4],
          description: 'Active participant',
          achievements: ['Participant 2023'],
          yearsActive: [2021, 2022, 2023]
        }] : [],
        leadership: i % 2 === 0 ? [{
          position: ['Member', 'Officer', 'Secretary'][i % 3],
          organization: 'Student Council',
          startDate: new Date('2023-06-01'),
          endDate: null,
          achievements: ['Active Leader 2023']
        }] : [],
        communityService: [{
          activity: 'Community Outreach',
          organization: 'Student Organizations',
          date: new Date('2023-09-15'),
          hours: 4 + (i * 2)
        }]
      },
      violations: {
        disciplinaryRecords: i % 10 === 0 ? [{
          violationType: 'Minor',
          description: 'Late submission',
          date: new Date('2023-10-01'),
          severity: 'Minor',
          sanction: 'Warning',
          status: 'Resolved',
          resolutionDate: new Date('2023-10-02')
        }] : []
      },
      skills: {
        technicalSkills: [
          { skillName: ['JavaScript', 'Python', 'Java', 'C++'][i % 4], proficiency: 'Intermediate', certification: null, dateObtained: null },
          { skillName: ['React', 'Django', 'Spring', 'Node.js'][i % 4], proficiency: 'Beginner', certification: null, dateObtained: null }
        ],
        softSkills: [
          { skillName: 'Communication', proficiency: 'Intermediate', description: 'Good communication skills' },
          { skillName: 'Teamwork', proficiency: 'Advanced', description: 'Works well in teams' }
        ],
        languages: [
          { language: 'Filipino', proficiency: 'Native', certification: null },
          { language: 'English', proficiency: 'Fluent', certification: null }
        ]
      },
      affiliations: {
        organizations: i % 2 === 0 ? [{
          orgName: 'IT Society',
          position: 'Member',
          type: 'Academic',
          startDate: new Date('2023-06-01'),
          endDate: null,
          achievements: ['Active Member 2023']
        }] : [],
        sportsTeams: i % 3 === 0 ? [{
          teamName: 'University Sports Team',
          sport: ['Basketball', 'Volleyball', 'Badminton'][i % 3],
          position: 'Player',
          achievements: ['Team Member 2023'],
          yearsActive: [2021, 2022, 2023]
        }] : [],
        clubs: [{
          clubName: 'Programming Club',
          role: 'Member',
          type: 'Academic',
          startDate: new Date('2023-06-01'),
          endDate: null,
          achievements: ['Active Participant 2023']
        }]
      },
      medicalInfo: {
        bloodType: ['A+', 'B+', 'O+', 'AB+'][i % 4],
        allergies: i % 3 === 0 ? ['Dust'] : [],
        medicalConditions: [],
        medications: [],
        physician: {
          name: `Dr. ${['Santos', 'Reyes', 'Cruz', 'Garcia'][i % 4]}`,
          contact: `+639${300000000 + i * 12345678}`
        },
        hospital: {
          name: 'Cabuyao Medical Center',
          address: 'Cabuyao, Laguna'
        }
      }
    });
  }
  
  return moreStudents;
};

async function populateDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ccs_profiling_system');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Student.deleteMany({});
    await Faculty.deleteMany({});
    await Instruction.deleteMany({});
    await Schedule.deleteMany({});
    await Event.deleteMany({});

    // Insert sample students
    const allStudents = [...sampleStudents, ...generateMoreStudents()];
    await Student.insertMany(allStudents);
    console.log(`${allStudents.length} students inserted`);

    console.log('Database populated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

populateDatabase();

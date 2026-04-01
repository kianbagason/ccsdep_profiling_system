import React, { useState } from 'react';
import { User, Save, X, Plus, Trash2 } from 'lucide-react';

const AddStudent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      middleName: '',
      suffix: '',
      birthDate: '',
      gender: '',
      civilStatus: '',
      citizenship: '',
      religion: '',
      email: '',
      phone: '',
      address: {
        street: '',
        barangay: '',
        city: '',
        province: '',
        zipCode: ''
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    },
    academicHistory: {
      elementary: {
        schoolName: '',
        address: '',
        yearGraduated: '',
        honors: ''
      },
      juniorHigh: {
        schoolName: '',
        address: '',
        yearGraduated: '',
        honors: ''
      },
      seniorHigh: {
        schoolName: '',
        address: '',
        strand: '',
        yearGraduated: '',
        honors: ''
      },
      college: {
        schoolName: '',
        degree: '',
        course: '',
        yearLevel: '',
        expectedGraduation: '',
        gwa: '',
        honors: ''
      }
    },
    currentEnrollment: {
      studentId: '',
      program: '',
      major: '',
      yearLevel: '',
      section: '',
      semester: '',
      academicYear: '',
      enrollmentStatus: '',
      scholarship: '',
      adviser: ''
    },
    nonAcademicActivities: {
      sports: [],
      arts: [],
      leadership: [],
      communityService: []
    },
    violations: {
      disciplinaryRecords: []
    },
    skills: {
      technicalSkills: [],
      softSkills: [],
      languages: []
    },
    affiliations: {
      organizations: [],
      sportsTeams: [],
      clubs: []
    },
    medicalInfo: {
      bloodType: '',
      allergies: [],
      medicalConditions: [],
      medications: [],
      physician: {
        name: '',
        contact: ''
      },
      hospital: {
        name: '',
        address: ''
      }
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic History', icon: User },
    { id: 'enrollment', label: 'Current Enrollment', icon: User },
    { id: 'activities', label: 'Activities', icon: User },
    { id: 'skills', label: 'Skills', icon: User },
    { id: 'affiliations', label: 'Affiliations', icon: User },
    { id: 'violations', label: 'Violations', icon: User },
    { id: 'medical', label: 'Medical Info', icon: User }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        ...(typeof prev[section as keyof typeof prev] === 'object' && !Array.isArray(prev[section as keyof typeof prev])
          ? { [field]: value }
          : {})
      }
    }));
  };

  const handleNestedInputChange = (section: string, subsection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Student added successfully!');
        setFormData({
          personalInfo: {
            firstName: '',
            lastName: '',
            middleName: '',
            suffix: '',
            birthDate: '',
            gender: '',
            civilStatus: '',
            citizenship: '',
            religion: '',
            email: '',
            phone: '',
            address: {
              street: '',
              barangay: '',
              city: '',
              province: '',
              zipCode: ''
            },
            emergencyContact: {
              name: '',
              relationship: '',
              phone: ''
            }
          },
          academicHistory: {
            elementary: { schoolName: '', address: '', yearGraduated: '', honors: '' },
            juniorHigh: { schoolName: '', address: '', yearGraduated: '', honors: '' },
            seniorHigh: { schoolName: '', address: '', strand: '', yearGraduated: '', honors: '' },
            college: { schoolName: '', degree: '', course: '', yearLevel: '', expectedGraduation: '', gwa: '', honors: '' }
          },
          currentEnrollment: {
            studentId: '', program: '', major: '', yearLevel: '', section: '', semester: '', academicYear: '', enrollmentStatus: '', scholarship: '', adviser: ''
          },
          nonAcademicActivities: { sports: [], arts: [], leadership: [], communityService: [] },
          violations: { disciplinaryRecords: [] },
          skills: { technicalSkills: [], softSkills: [], languages: [] },
          affiliations: { organizations: [], sportsTeams: [], clubs: [] },
          medicalInfo: { bloodType: '', allergies: [], medicalConditions: [], medications: [], physician: { name: '', contact: '' }, hospital: { name: '', address: '' } }
        });
        setActiveTab('personal');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error adding student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="First Name *"
          value={formData.personalInfo.firstName}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'firstName', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Last Name *"
          value={formData.personalInfo.lastName}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'lastName', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={formData.personalInfo.middleName}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'middleName', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Suffix"
          value={formData.personalInfo.suffix}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'suffix', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
        <input
          type="date"
          placeholder="Birth Date *"
          value={formData.personalInfo.birthDate}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'birthDate', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        />
        <select
          value={formData.personalInfo.gender}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'gender', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          value={formData.personalInfo.civilStatus}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'civilStatus', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Civil Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="Widowed">Widowed</option>
        </select>
        <input
          type="text"
          placeholder="Citizenship *"
          value={formData.personalInfo.citizenship}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'citizenship', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Religion"
          value={formData.personalInfo.religion}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'religion', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email *"
          value={formData.personalInfo.email}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'email', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="tel"
          placeholder="Phone *"
          value={formData.personalInfo.phone}
          onChange={(e) => handleNestedInputChange('personalInfo', '', 'phone', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Street *"
            value={formData.personalInfo.address.street}
            onChange={(e) => handleNestedInputChange('personalInfo', 'address', 'street', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Barangay *"
            value={formData.personalInfo.address.barangay}
            onChange={(e) => handleNestedInputChange('personalInfo', 'address', 'barangay', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="City *"
            value={formData.personalInfo.address.city}
            onChange={(e) => handleNestedInputChange('personalInfo', 'address', 'city', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Province *"
            value={formData.personalInfo.address.province}
            onChange={(e) => handleNestedInputChange('personalInfo', 'address', 'province', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Zip Code *"
            value={formData.personalInfo.address.zipCode}
            onChange={(e) => handleNestedInputChange('personalInfo', 'address', 'zipCode', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Emergency Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Contact Name *"
            value={formData.personalInfo.emergencyContact.name}
            onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'name', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Relationship *"
            value={formData.personalInfo.emergencyContact.relationship}
            onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'relationship', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
          <input
            type="tel"
            placeholder="Contact Phone *"
            value={formData.personalInfo.emergencyContact.phone}
            onChange={(e) => handleNestedInputChange('personalInfo', 'emergencyContact', 'phone', e.target.value)}
            className="clay-input px-4 py-3 text-white placeholder-gray-400"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentEnrollment = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Current Enrollment</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Student ID (7 digits) *"
          value={formData.currentEnrollment.studentId}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 7);
            handleNestedInputChange('currentEnrollment', '', 'studentId', value);
          }}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          pattern="[0-9]{7}"
          maxLength={7}
          required
        />
        <select
          value={formData.currentEnrollment.program}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'program', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Program</option>
          <option value="BSIT">BSIT</option>
          <option value="BSCS">BSCS</option>
          <option value="BSIS">BSIS</option>
        </select>
        <input
          type="text"
          placeholder="Major"
          value={formData.currentEnrollment.major}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'major', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
        <select
          value={formData.currentEnrollment.yearLevel}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'yearLevel', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Year Level</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        <input
          type="text"
          placeholder="Section *"
          value={formData.currentEnrollment.section}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'section', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <select
          value={formData.currentEnrollment.semester}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'semester', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Semester</option>
          <option value="First Semester">First Semester</option>
          <option value="Second Semester">Second Semester</option>
          <option value="Summer">Summer</option>
        </select>
        <input
          type="text"
          placeholder="Academic Year *"
          value={formData.currentEnrollment.academicYear}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'academicYear', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <select
          value={formData.currentEnrollment.enrollmentStatus}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'enrollmentStatus', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Status</option>
          <option value="Regular">Regular</option>
          <option value="Irregular">Irregular</option>
          <option value="Transferee">Transferee</option>
          <option value="Returnee">Returnee</option>
        </select>
        <input
          type="text"
          placeholder="Scholarship"
          value={formData.currentEnrollment.scholarship}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'scholarship', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Adviser"
          value={formData.currentEnrollment.adviser}
          onChange={(e) => handleNestedInputChange('currentEnrollment', '', 'adviser', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'enrollment':
        return renderCurrentEnrollment();
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Add New Student</h1>
        <a
          href="/students"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </a>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('success') ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'ccs-orange-btn text-white'
                    : 'clay-card text-gray-300 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="clay-card p-6">
          {renderTabContent()}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <a
            href="/students"
            className="px-6 py-3 clay-card text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </a>
          <button
            type="submit"
            disabled={loading}
            className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{loading ? 'Saving...' : 'Save Student'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;

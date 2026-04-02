import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const AddStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Scroll to top to see messages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: formData,
          academicHistory: {
            elementary: { schoolName: '', address: '', yearGraduated: '', honors: '' },
            juniorHigh: { schoolName: '', address: '', yearGraduated: '', honors: '' },
            seniorHigh: { schoolName: '', address: '', strand: '', yearGraduated: '', honors: '' },
            college: { schoolName: '', degree: '', course: '', yearLevel: '', expectedGraduation: '', gwa: '', honors: '' }
          },
          currentEnrollment: {
            studentId: Math.floor(1000000 + Math.random() * 9000000).toString(),
            program: 'BSIT',
            major: '',
            yearLevel: 1,
            section: 'A',
            semester: 'First Semester',
            academicYear: '2024-2025',
            enrollmentStatus: 'Regular',
            scholarship: '',
            adviser: ''
          },
          nonAcademicActivities: { sports: [], arts: [], leadership: [], communityService: [] },
          violations: { disciplinaryRecords: [] },
          skills: { technicalSkills: [], softSkills: [], languages: [] },
          affiliations: { organizations: [], sportsTeams: [], clubs: [] },
          medicalInfo: { bloodType: '', allergies: [], medicalConditions: [], medications: [], physician: { name: '', contact: '' }, hospital: { name: '', address: '' } }
        }),
      });

      if (response.ok) {
        setMessage('Student added successfully!');
        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFormData({
          firstName: '',
          lastName: '',
          middleName: '',
          birthDate: '',
          gender: '',
          email: '',
          phone: ''
        });
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

  const renderForm = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="First Name *"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Last Name *"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={formData.middleName}
          onChange={(e) => handleInputChange('middleName', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
        />
        <input
          type="date"
          placeholder="Birth Date *"
          value={formData.birthDate}
          onChange={(e) => handleInputChange('birthDate', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        />
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          className="clay-input px-4 py-3 text-white"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
        <input
          type="tel"
          placeholder="Phone *"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="clay-input px-4 py-3 text-white placeholder-gray-400"
          required
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    return renderForm();
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
        {/* Form Content */}
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

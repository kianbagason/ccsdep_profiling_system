import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { api } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

const AddFaculty: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    employeeId: '',
    department: '',
    position: '',
    rank: '',
    status: '',
    hireDate: '',
    degree: '',
    university: '',
    graduationYear: ''
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
      const facultyData = {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          middleName: formData.middleName,
          birthDate: formData.birthDate,
          gender: formData.gender,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: '',
            barangay: '',
            city: '',
            province: '',
            zipCode: ''
          },
          civilStatus: 'Single',
          citizenship: 'Filipino',
          religion: ''
        },
        employmentDetails: {
          employeeId: formData.employeeId,
          department: formData.department,
          position: formData.position,
          rank: formData.rank,
          status: formData.status,
          hireDate: formData.hireDate,
          specialization: [],
          loadUnits: 0,
          office: '',
          consultationHours: ''
        },
        educationalBackground: {
          bachelors: {
            degree: formData.degree,
            university: formData.university,
            year: parseInt(formData.graduationYear),
            honors: ''
          },
          masters: null,
          doctoral: null
        },
        certifications: [],
        researchInterests: [],
        publications: [],
        profilePicture: ''
      };

      await api.post('/faculty', facultyData);

      setMessage('Faculty added successfully!');
      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        navigate('/faculty');
      }, 1500);
    } catch (error) {
      setMessage('Error adding faculty. Please try again.');
      // Scroll to top to see error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Add New Faculty</h1>
          <button
            onClick={() => navigate('/faculty')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('success') ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </div>

          {/* Employment Details */}
          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Employment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Employee ID *"
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="clay-input px-4 py-3 text-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Department *"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                className="clay-input px-4 py-3 text-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Position *"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="clay-input px-4 py-3 text-white placeholder-gray-400"
                required
              />
              <select
                value={formData.rank}
                onChange={(e) => handleInputChange('rank', e.target.value)}
                className="clay-input px-4 py-3 text-white"
                required
              >
                <option value="">Select Rank</option>
                <option value="Instructor">Instructor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Professor">Professor</option>
              </select>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="clay-input px-4 py-3 text-white"
                required
              >
                <option value="">Select Status</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Visiting">Visiting</option>
                <option value="Adjunct">Adjunct</option>
              </select>
              <input
                type="date"
                placeholder="Hire Date *"
                value={formData.hireDate}
                onChange={(e) => handleInputChange('hireDate', e.target.value)}
                className="clay-input px-4 py-3 text-white"
                required
              />
            </div>
          </div>

          {/* Educational Background */}
          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Bachelor's Degree</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Degree *"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="clay-input px-4 py-3 text-white placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="University *"
                value={formData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                className="clay-input px-4 py-3 text-white placeholder-gray-400"
                required
              />
              <input
                type="number"
                placeholder="Year Graduated *"
                value={formData.graduationYear}
                onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                className="clay-input px-4 py-3 text-white placeholder-gray-400"
                min="1950"
                max={new Date().getFullYear()}
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/faculty')}
              className="px-6 py-3 clay-card text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2 disabled:opacity-50"
            >
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Faculty'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;

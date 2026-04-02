import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await fetch(`/api/students/${id}`);
      const data = await response.json();
      
      if (data.personalInfo) {
        setFormData({
          firstName: data.personalInfo.firstName || '',
          lastName: data.personalInfo.lastName || '',
          middleName: data.personalInfo.middleName || '',
          birthDate: data.personalInfo.birthDate ? new Date(data.personalInfo.birthDate).toISOString().split('T')[0] : '',
          gender: data.personalInfo.gender || '',
          email: data.personalInfo.email || '',
          phone: data.personalInfo.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      setMessage('Error loading student data');
    } finally {
      setLoading(false);
    }
  };

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
    
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: formData,
        }),
      });

      if (response.ok) {
        setMessage('Student updated successfully!');
        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          navigate('/students');
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error updating student. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Edit Student</h1>
          <button
            onClick={() => navigate('/students')}
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="px-6 py-3 clay-card text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2 disabled:opacity-50"
            >
              <Save size={20} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;

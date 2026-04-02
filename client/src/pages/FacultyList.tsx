import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Mail, Phone, MapPin, GraduationCap, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../services/apiService';

interface Faculty {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
  };
  employmentDetails: {
    position: string;
    department: string;
    rank: string;
    status: string;
  };
  educationalBackground: {
    doctoral?: { degree: string; university: string; year: string };
    masters?: { degree: string; university: string; year: string };
    bachelors?: { degree: string; university: string; year: string; honors?: string };
  };
}

const FacultyList: React.FC = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const data = await api.get('/faculty');
      setFaculty(data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this faculty?')) {
      try {
        await api.delete(`/faculty/${id}`);
        setFaculty(faculty.filter(member => member._id !== id));
      } catch (error) {
        console.error('Error deleting faculty:', error);
      }
    }
  };

  const filteredFaculty = faculty.filter(member =>
    `${member.personalInfo.firstName} ${member.personalInfo.lastName} ${member.employmentDetails.department}`.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Faculty Information</h1>
        <button
          onClick={() => window.location.href = '/faculty/add'}
          className="ccs-orange-btn flex items-center gap-2"
        >
          <Plus size={20} />
          Add Faculty
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="clay-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search faculty by name or department..."
              className="clay-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="ccs-orange-btn flex items-center gap-2">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div key={member._id} className="clay-card p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {member.personalInfo.firstName} {member.personalInfo.lastName}
                </h3>
                <p className="text-gray-400">{member.employmentDetails.position}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                {member.personalInfo.email}
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                {member.personalInfo.phone}
              </div>
              <div className="flex items-center text-gray-300">
                <Users size={16} className="mr-2" />
                {member.employmentDetails.department}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                {member.employmentDetails.rank}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                {member.educationalBackground.doctoral?.degree || 
                 member.educationalBackground.masters?.degree || 
                 member.educationalBackground.bachelors?.degree}
              </p>
              <p className="text-xs text-gray-500">
                {member.educationalBackground.doctoral?.university || 
                 member.educationalBackground.masters?.university || 
                 member.educationalBackground.bachelors?.university}
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <button 
                onClick={() => window.location.href = `/faculty/edit/${member._id}`}
                className="p-2 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Edit"
              >
                <Edit size={16} className="text-green-400" />
              </button>
              <button 
                onClick={() => handleDelete(member._id)}
                className="p-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="clay-card p-12 text-center">
          <p className="text-gray-400">No faculty members found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default FacultyList;

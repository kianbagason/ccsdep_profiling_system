import React, { useState, useEffect } from 'react';
import { Users, Plus, Search, Edit, Trash2, Eye, Filter } from 'lucide-react';

interface Student {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  currentEnrollment: {
    studentId: string;
    program: string;
    yearLevel: number;
    section: string;
  };
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProgram, setFilterProgram] = useState('');
  const [filterYear, setFilterYear] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await fetch(`/api/students/${id}`, { method: 'DELETE' });
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.personalInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.personalInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.currentEnrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = !filterProgram || student.currentEnrollment.program === filterProgram;
    const matchesYear = !filterYear || student.currentEnrollment.yearLevel.toString() === filterYear;
    
    return matchesSearch && matchesProgram && matchesYear;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Users size={32} className="mr-3" />
          Student List
        </h1>
        <a
          href="/students/add"
          className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Student</span>
        </a>
      </div>

      {/* Search and Filters */}
      <div className="clay-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="clay-input w-full pl-10 pr-4 py-3 text-white placeholder-gray-400"
            />
          </div>
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="clay-input w-full px-4 py-3 text-white"
          >
            <option value="">All Programs</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCS">BSCS</option>
            <option value="BSIS">BSIS</option>
          </select>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="clay-input w-full px-4 py-3 text-white"
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterProgram('');
              setFilterYear('');
            }}
            className="ccs-orange-btn px-4 py-3 text-white flex items-center justify-center space-x-2"
          >
            <Filter size={20} />
            <span>Clear Filters</span>
          </button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student._id} className="clay-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {student.personalInfo.firstName} {student.personalInfo.lastName}
                </h3>
                <p className="text-gray-400">{student.currentEnrollment.studentId}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.location.href = `/students/view/${student._id}`}
                  className="p-2 bg-blue-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <Eye size={16} className="text-blue-400" />
                </button>
                <button
                  onClick={() => window.location.href = `/students/edit/${student._id}`}
                  className="p-2 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <Edit size={16} className="text-green-400" />
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="p-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                >
                  <Trash2 size={16} className="text-red-400" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Program:</span>
                <span className="text-white">{student.currentEnrollment.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Year:</span>
                <span className="text-white">{student.currentEnrollment.yearLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Section:</span>
                <span className="text-white">{student.currentEnrollment.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white text-sm">{student.personalInfo.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No students found</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default StudentList;

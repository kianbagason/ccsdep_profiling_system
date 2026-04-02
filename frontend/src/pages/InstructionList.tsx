import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, FileText, Calendar, User, Award, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../services/apiService';

interface Instruction {
  _id: string;
  title: string;
  type: string;
  courseCode: string;
  courseTitle: string;
  author: string;
  department: string;
  program: string;
  yearLevel: number;
  semester: string;
  academicYear: string;
  credits: number;
  description: string;
  learningOutcomes: string[];
  topics: { title: string; description: string; duration: string; order: number }[];
  assessmentMethods: { type: string; title: string; weight: number }[];
  resources: { title: string; type: string; description: string }[];
  attachments: { filename: string; originalName: string; mimeType: string; size: number; uploadDate: string }[];
  status: string;
  version: string;
  lastReviewed?: string;
}

const InstructionList: React.FC = () => {
  const [instruction, setInstruction] = useState<Instruction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchInstruction();
  }, []);

  const fetchInstruction = async () => {
    try {
      const data = await api.get('/instruction');
      setInstruction(data);
    } catch (error) {
      console.error('Error fetching instruction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this instruction?')) {
      try {
        await api.delete(`/instruction/${id}`);
        setInstruction(instruction.filter(item => item._id !== id));
      } catch (error) {
        console.error('Error deleting instruction:', error);
      }
    }
  };

  const filteredInstruction = instruction.filter(item => {
    const matchesSearch = `${item.title} ${item.courseCode} ${item.author} ${item.department}`.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = !filterType || item.type === filterType;
    return matchesSearch && matchesType;
  });

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
        <h1 className="text-3xl font-bold text-white">Instructional Materials</h1>
        <button
          onClick={() => window.location.href = '/instruction/add'}
          className="ccs-orange-btn flex items-center gap-2"
        >
          <Plus size={20} />
          Add Instruction
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="clay-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search materials by title, course, or author..."
              className="clay-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="clay-input px-4 py-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Syllabus">Syllabus</option>
            <option value="Lesson Plan">Lesson Plan</option>
            <option value="Curriculum">Curriculum</option>
            <option value="Training Module">Training Module</option>
          </select>
          <button className="ccs-orange-btn flex items-center gap-2">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstruction.map((item) => (
          <div key={item._id} className="clay-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <BookOpen size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.courseCode} - {item.courseTitle}</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full">
                {item.type}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <div className="flex items-center">
                <User size={14} className="mr-2" />
                {item.author}
              </div>
              <div className="flex items-center">
                <Award size={14} className="mr-2" />
                {item.department} • {item.program} {item.yearLevel}
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-2" />
                {item.academicYear} • {item.semester}
              </div>
              <div className="flex items-center">
                <FileText size={14} className="mr-2" />
                {item.credits} credits • Version {item.version}
              </div>
            </div>

            {item.description && (
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {item.description}
              </p>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Learning Outcomes:</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                {item.learningOutcomes.slice(0, 3).map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    {outcome}
                  </li>
                ))}
                {item.learningOutcomes.length > 3 && (
                  <li className="text-orange-400">+{item.learningOutcomes.length - 3} more</li>
                )}
              </ul>
            </div>

            {item.attachments.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Attachments:</h4>
                <div className="space-y-1">
                  {item.attachments.slice(0, 2).map((attachment, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-400">
                      <FileText size={12} className="mr-2" />
                      {attachment.originalName}
                    </div>
                  ))}
                  {item.attachments.length > 2 && (
                    <div className="text-xs text-orange-400">+{item.attachments.length - 2} more files</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button 
                onClick={() => window.location.href = `/instruction/edit/${item._id}`}
                className="p-2 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Edit"
              >
                <Edit size={16} className="text-green-400" />
              </button>
              <button 
                onClick={() => handleDelete(item._id)}
                className="p-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredInstruction.length === 0 && (
        <div className="clay-card p-12 text-center">
          <p className="text-gray-400">No instructional materials found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default InstructionList;

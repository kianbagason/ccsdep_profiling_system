import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, Clock, MapPin, Users, User, BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../services/apiService';

interface Schedule {
  _id: string;
  course: {
    code: string;
    title: string;
    type: string;
    credits: number;
    description: string;
  };
  section: string;
  faculty: {
    name: string;
    employeeId: string;
    department: string;
  };
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  room: {
    building: string;
    roomNumber: string;
    type: string;
    capacity: number;
    equipment: string[];
  };
  enrollment: {
    current: number;
    maximum: number;
    waitlist: number;
  };
  academicDetails: {
    yearLevel: number;
    semester: string;
    academicYear: string;
    program: string;
    department: string;
  };
}

const ScheduleList: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDay, setFilterDay] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const data = await api.get('/scheduling');
      setSchedules(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await api.delete(`/scheduling/${id}`);
        setSchedules(schedules.filter(schedule => schedule._id !== id));
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = `${schedule.course.code} ${schedule.course.title} ${schedule.faculty.name} ${schedule.section}`.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDay = !filterDay || schedule.schedule.days.includes(filterDay);
    return matchesSearch && matchesDay;
  });

  const getCourseTypeColor = (type: string) => {
    switch (type) {
      case 'Regular': return 'bg-blue-500';
      case 'Laboratory': return 'bg-green-500';
      case 'Lecture': return 'bg-purple-500';
      default: return 'bg-gray-500';
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
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Course Schedules</h1>
        <button
          onClick={() => window.location.href = '/schedule/add'}
          className="ccs-orange-btn flex items-center gap-2"
        >
          <Plus size={20} />
          Add Schedule
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="clay-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by course code, title, instructor, or section..."
              className="clay-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="clay-input px-4 py-2"
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
          >
            <option value="">All Days</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <button className="ccs-orange-btn flex items-center gap-2">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchedules.map((schedule) => (
          <div key={schedule._id} className="clay-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{schedule.course.code}</h3>
                  <p className="text-sm text-gray-400">{schedule.course.title}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-white text-xs rounded-full ${getCourseTypeColor(schedule.course.type)}`}>
                {schedule.course.type}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <BookOpen size={16} className="mr-2" />
                {schedule.section} • {schedule.course.credits} credits
              </div>
              <div className="flex items-center text-gray-300">
                <User size={16} className="mr-2" />
                {schedule.faculty.name}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                {schedule.schedule.startTime} - {schedule.schedule.endTime}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                {schedule.room.building} - {schedule.room.roomNumber}
              </div>
              <div className="flex items-center text-gray-300">
                <Users size={16} className="mr-2" />
                {schedule.enrollment.current}/{schedule.enrollment.maximum} enrolled
              </div>
            </div>

            <div className="mt-4 mb-4">
              <div className="flex flex-wrap gap-1">
                {schedule.schedule.days.map((day, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {day.substring(0, 3)}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="text-xs text-gray-400 space-y-1">
                <div>Program: {schedule.academicDetails.program} {schedule.academicDetails.yearLevel}</div>
                <div>Semester: {schedule.academicDetails.semester} • {schedule.academicDetails.academicYear}</div>
                <div>Room Type: {schedule.room.type} • Capacity: {schedule.room.capacity}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => window.location.href = `/schedule/edit/${schedule._id}`}
                className="p-2 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Edit"
              >
                <Edit size={16} className="text-green-400" />
              </button>
              <button 
                onClick={() => handleDelete(schedule._id)}
                className="p-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <div className="clay-card p-12 text-center">
          <p className="text-gray-400">No schedules found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;

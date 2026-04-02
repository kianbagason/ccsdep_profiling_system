import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseCode: '',
    courseTitle: '',
    courseType: '',
    credits: '',
    section: '',
    facultyName: '',
    employeeId: '',
    department: '',
    days: [] as string[],
    startTime: '',
    endTime: '',
    building: '',
    roomNumber: '',
    roomType: '',
    capacity: '',
    yearLevel: '',
    semester: '',
    academicYear: '',
    program: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDayChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Scroll to top to see messages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setLoading(true);
    setMessage('');

    try {
      const scheduleData = {
        course: {
          code: formData.courseCode,
          title: formData.courseTitle,
          type: formData.courseType,
          credits: parseInt(formData.credits),
          description: ''
        },
        section: formData.section,
        faculty: {
          name: formData.facultyName,
          employeeId: formData.employeeId,
          department: formData.department
        },
        schedule: {
          days: formData.days,
          startTime: formData.startTime,
          endTime: formData.endTime
        },
        room: {
          building: formData.building,
          roomNumber: formData.roomNumber,
          type: formData.roomType,
          capacity: parseInt(formData.capacity),
          equipment: []
        },
        enrollment: {
          current: 0,
          maximum: parseInt(formData.capacity),
          waitlist: 0
        },
        academicDetails: {
          yearLevel: parseInt(formData.yearLevel),
          semester: formData.semester,
          academicYear: formData.academicYear,
          program: formData.program,
          department: formData.department
        },
        prerequisites: [],
        corequisites: [],
        status: 'Open',
        remarks: ''
      };

      const response = await fetch('/api/scheduling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheduleData),
      });

      if (response.ok) {
        setMessage('Schedule added successfully!');
        // Scroll to top to see success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate('/schedule'), 1500);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        // Scroll to top to see error message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      setMessage('Error adding schedule. Please try again.');
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
          <h1 className="text-3xl font-bold text-white">Add New Schedule</h1>
          <button onClick={() => navigate('/schedule')} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-500 bg-opacity-20 text-green-400' : 'bg-red-500 bg-opacity-20 text-red-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Course Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Course Code *" value={formData.courseCode} onChange={(e) => handleInputChange('courseCode', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Course Title *" value={formData.courseTitle} onChange={(e) => handleInputChange('courseTitle', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <select value={formData.courseType} onChange={(e) => handleInputChange('courseType', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Type</option>
                <option value="Regular">Regular</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Lecture">Lecture</option>
              </select>
              <input type="number" placeholder="Credits *" value={formData.credits} onChange={(e) => handleInputChange('credits', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Faculty & Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Section *" value={formData.section} onChange={(e) => handleInputChange('section', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Faculty Name *" value={formData.facultyName} onChange={(e) => handleInputChange('facultyName', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Employee ID *" value={formData.employeeId} onChange={(e) => handleInputChange('employeeId', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Department *" value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Schedule Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-white text-sm mb-2 block">Days *</label>
                <div className="flex flex-wrap gap-2">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayChange(day)}
                      className={`px-4 py-2 rounded-lg text-sm ${formData.days.includes(day) ? 'ccs-orange-btn' : 'clay-card text-gray-300 hover:text-white'}`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
              <input type="time" placeholder="Start Time *" value={formData.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="time" placeholder="End Time *" value={formData.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Room & Enrollment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Building *" value={formData.building} onChange={(e) => handleInputChange('building', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Room Number *" value={formData.roomNumber} onChange={(e) => handleInputChange('roomNumber', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <select value={formData.roomType} onChange={(e) => handleInputChange('roomType', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Room Type</option>
                <option value="Classroom">Classroom</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Computer Lab">Computer Lab</option>
              </select>
              <input type="number" placeholder="Capacity *" value={formData.capacity} onChange={(e) => handleInputChange('capacity', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Academic Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select value={formData.yearLevel} onChange={(e) => handleInputChange('yearLevel', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Year Level</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              <select value={formData.semester} onChange={(e) => handleInputChange('semester', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Semester</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
                <option value="Summer">Summer</option>
              </select>
              <input type="text" placeholder="Academic Year *" value={formData.academicYear} onChange={(e) => handleInputChange('academicYear', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Program *" value={formData.program} onChange={(e) => handleInputChange('program', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/schedule')} className="px-6 py-3 clay-card text-gray-300 hover:text-white">Cancel</button>
            <button type="submit" disabled={loading} className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2 disabled:opacity-50">
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Schedule'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;

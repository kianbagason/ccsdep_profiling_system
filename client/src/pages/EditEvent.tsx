import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { api } from '../services/apiService';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    category: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: '',
    capacity: '',
    organizerName: '',
    department: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await api.get(`/events/${id}`);
      
      if (data) {
        setFormData({
          title: data.title || '',
          type: data.type || '',
          category: data.category || '',
          description: data.description || '',
          startDate: data.schedule?.startDate ? new Date(data.schedule.startDate).toISOString().split('T')[0] : '',
          endDate: data.schedule?.endDate ? new Date(data.schedule.endDate).toISOString().split('T')[0] : '',
          startTime: data.schedule?.startTime || '',
          endTime: data.schedule?.endTime || '',
          venue: data.location?.venue || '',
          capacity: data.location?.capacity?.toString() || '',
          organizerName: data.organizer?.name || '',
          department: data.organizer?.department || '',
          contactPerson: data.organizer?.contactPerson || '',
          contactEmail: data.organizer?.contactEmail || '',
          contactPhone: data.organizer?.contactPhone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setMessage('Error loading event data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Scroll to top to see messages
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setSaving(true);
    setMessage('');

    try {
      const eventData = {
        title: formData.title,
        type: formData.type,
        category: formData.category,
        description: formData.description,
        organizer: {
          name: formData.organizerName,
          department: formData.department,
          contactPerson: formData.contactPerson,
          contactEmail: formData.contactEmail,
          contactPhone: formData.contactPhone
        },
        schedule: {
          startDate: formData.startDate,
          endDate: formData.endDate,
          startTime: formData.startTime,
          endTime: formData.endTime,
          timezone: 'Asia/Manila'
        },
        location: {
          venue: formData.venue,
          address: '',
          building: '',
          room: '',
          capacity: parseInt(formData.capacity)
        },
        participants: {
          targetAudience: ['All Students'],
          currentParticipants: 0,
          maxParticipants: parseInt(formData.capacity),
          waitlist: 0,
          requirements: [],
          registrationDeadline: new Date().toISOString()
        },
        details: {
          isRequired: false,
          isMandatory: false,
          credits: 0,
          fee: 0,
          dressCode: '',
          equipment: [],
          materials: []
        },
        resources: {
          budget: 0,
          sponsors: [],
          partners: [],
          volunteers: [],
          attachments: []
        },
        status: 'Planning',
        priority: 'Medium',
        visibility: 'Public',
        assessment: {
          feedbackRequired: false,
          certificateIssued: false,
          evaluationCriteria: [],
          outcomes: []
        },
        socialMedia: {}
      };

      await api.put(`/events/${id}`, eventData);

      setMessage('Event updated successfully!');
      // Scroll to top to see success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        navigate('/events');
      }, 1500);
    } catch (error) {
      setMessage('Error updating event. Please try again.');
      // Scroll to top to see error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Edit Event</h1>
          <button onClick={() => navigate('/events')} className="text-gray-400 hover:text-white">
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
            <h3 className="text-xl font-semibold text-white mb-4">Event Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Event Title *" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <select value={formData.type} onChange={(e) => handleInputChange('type', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Type</option>
                <option value="Curricular">Curricular</option>
                <option value="Extra-curricular">Extra-curricular</option>
              </select>
              <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Category</option>
                <option value="Academic">Academic</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Technical">Technical</option>
                <option value="Leadership">Leadership</option>
                <option value="Community Service">Community Service</option>
                <option value="Competition">Competition</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
              </select>
              <textarea placeholder="Description *" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="clay-input px-4 py-3 text-white" rows={3} required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Schedule & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" placeholder="Start Date *" value={formData.startDate} onChange={(e) => handleInputChange('startDate', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="date" placeholder="End Date *" value={formData.endDate} onChange={(e) => handleInputChange('endDate', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="time" placeholder="Start Time *" value={formData.startTime} onChange={(e) => handleInputChange('startTime', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="time" placeholder="End Time *" value={formData.endTime} onChange={(e) => handleInputChange('endTime', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Venue *" value={formData.venue} onChange={(e) => handleInputChange('venue', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="number" placeholder="Capacity *" value={formData.capacity} onChange={(e) => handleInputChange('capacity', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Organizer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Organizer Name *" value={formData.organizerName} onChange={(e) => handleInputChange('organizerName', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Department *" value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="text" placeholder="Contact Person *" value={formData.contactPerson} onChange={(e) => handleInputChange('contactPerson', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="email" placeholder="Contact Email *" value={formData.contactEmail} onChange={(e) => handleInputChange('contactEmail', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="tel" placeholder="Contact Phone *" value={formData.contactPhone} onChange={(e) => handleInputChange('contactPhone', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/events')} className="px-6 py-3 clay-card text-gray-300 hover:text-white">Cancel</button>
            <button type="submit" disabled={saving} className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2 disabled:opacity-50">
              <Save size={20} />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;

import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, MapPin, Users, Clock, User, Tag, Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../services/apiService';

interface Event {
  _id: string;
  title: string;
  type: string;
  category: string;
  description: string;
  organizer: {
    name: string;
    department: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
  };
  schedule: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  location: {
    venue: string;
    address: string;
    building: string;
    capacity: number;
  };
  participants: {
    targetAudience: string[];
    currentParticipants: number;
    maxParticipants: number;
    waitlist: number;
    requirements: string[];
    registrationDeadline: string;
  };
  details: {
    isRequired: boolean;
    isMandatory: boolean;
    credits: number;
  };
  status: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await api.get('/events');
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = `${event.title} ${event.description} ${event.organizer.name}`.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = !filterType || event.type === filterType;
    const matchesCategory = !filterCategory || event.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getEventTypeColor = (type: string) => {
    return type === 'Curricular' ? 'bg-blue-500' : 'bg-green-500';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Academic': 'bg-purple-500',
      'Sports': 'bg-orange-500',
      'Cultural': 'bg-pink-500',
      'Technical': 'bg-cyan-500',
      'Leadership': 'bg-indigo-500',
      'Community Service': 'bg-yellow-500',
      'Competition': 'bg-red-500',
      'Workshop': 'bg-teal-500',
      'Seminar': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
        <h1 className="text-3xl font-bold text-white">Events Management</h1>
        <button
          onClick={() => window.location.href = '/events/add'}
          className="ccs-orange-btn flex items-center gap-2"
        >
          <Plus size={20} />
          Add Event
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="clay-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events by title, description, or organizer..."
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
            <option value="Curricular">Curricular</option>
            <option value="Extra-curricular">Extra-curricular</option>
          </select>
          <select
            className="clay-input px-4 py-2"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
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
          <button className="ccs-orange-btn flex items-center gap-2">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event._id} className="clay-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-1 text-white text-xs rounded-full ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`px-2 py-1 text-white text-xs rounded-full ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                {formatDate(event.schedule.startDate)} - {formatDate(event.schedule.endDate)}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock size={16} className="mr-2" />
                {event.schedule.startTime} - {event.schedule.endTime}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2" />
                {event.location.venue}
              </div>
              <div className="flex items-center text-gray-300">
                <User size={16} className="mr-2" />
                {event.organizer.name}
              </div>
              <div className="flex items-center text-gray-300">
                <Users size={16} className="mr-2" />
                {event.participants.currentParticipants}/{event.participants.maxParticipants} registered
              </div>
            </div>

            {event.description && (
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                {event.description}
              </p>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-medium text-white mb-2">Target Audience:</h4>
              <div className="flex flex-wrap gap-1">
                {event.participants.targetAudience.slice(0, 3).map((audience, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                    {audience}
                  </span>
                ))}
                {event.participants.targetAudience.length > 3 && (
                  <span className="text-xs text-orange-400">+{event.participants.targetAudience.length - 3} more</span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="text-xs text-gray-400 space-y-1">
                <div>Registration Deadline: {formatDate(event.participants.registrationDeadline)}</div>
                <div>Credits: {event.details.credits} • {event.details.isRequired ? 'Required' : 'Optional'}</div>
                <div>Capacity: {event.location.capacity} • Waitlist: {event.participants.waitlist}</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button 
                onClick={() => window.location.href = `/events/edit/${event._id}`}
                className="p-2 bg-green-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Edit"
              >
                <Edit size={16} className="text-green-400" />
              </button>
              <button 
                onClick={() => handleDelete(event._id)}
                className="p-2 bg-red-500 bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                title="Delete"
              >
                <Trash2 size={16} className="text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="clay-card p-12 text-center">
          <p className="text-gray-400">No events found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default EventList;

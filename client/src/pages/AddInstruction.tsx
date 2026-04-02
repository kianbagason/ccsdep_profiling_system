import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddInstruction: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    targetProgram: '',
    yearLevel: '',
    semester: '',
    academicYear: '',
    department: '',
    effectiveDate: '',
    expiryDate: '',
    contactPerson: '',
    contactEmail: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setLoading(true);
    setMessage('');

    try {
      const instructionData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        content: {
          summary: formData.description,
          sections: [],
          attachments: []
        },
        applicability: {
          programs: [formData.targetProgram],
          yearLevels: [parseInt(formData.yearLevel)],
          semesters: [formData.semester],
          departments: [formData.department],
          courses: []
        },
        effectiveDate: formData.effectiveDate,
        expiryDate: formData.expiryDate || null,
        issuingAuthority: {
          department: formData.department,
          office: 'Academic Affairs',
          signatory: formData.contactPerson,
          designation: ''
        },
        priority: formData.priority,
        status: 'Active',
        acknowledgmentRequired: false,
        metadata: {
          version: '1.0',
          lastReviewed: new Date().toISOString(),
          nextReview: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          reviewCycle: 'Annual',
          superseded: false
        },
        distribution: {
          channels: ['Portal'],
          visibility: 'Public',
          restrictedTo: []
        },
        relatedInstructions: [],
        compliance: {
          trackingRequired: false,
          reportingRequirements: []
        }
      };

      const response = await fetch('/api/instruction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(instructionData),
      });

      if (response.ok) {
        setMessage('Instruction added successfully!');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => navigate('/instruction'), 1500);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      setMessage('Error adding instruction. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">Add New Instruction</h1>
          <button onClick={() => navigate('/instruction')} className="text-gray-400 hover:text-white">
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
            <h3 className="text-xl font-semibold text-white mb-4">Instruction Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Title *" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Category</option>
                <option value="Academic">Academic</option>
                <option value="Administrative">Administrative</option>
                <option value="Policy">Policy</option>
                <option value="Guideline">Guideline</option>
                <option value="Memo">Memo</option>
              </select>
              <textarea placeholder="Description *" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="clay-input px-4 py-3 text-white" rows={3} required />
              <select value={formData.priority} onChange={(e) => handleInputChange('priority', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Target Audience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Target Program *" value={formData.targetProgram} onChange={(e) => handleInputChange('targetProgram', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <select value={formData.yearLevel} onChange={(e) => handleInputChange('yearLevel', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Year Level</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="All">All Years</option>
              </select>
              <select value={formData.semester} onChange={(e) => handleInputChange('semester', e.target.value)} className="clay-input px-4 py-3 text-white" required>
                <option value="">Select Semester</option>
                <option value="First Semester">First Semester</option>
                <option value="Second Semester">Second Semester</option>
                <option value="Summer">Summer</option>
                <option value="All">All Semesters</option>
              </select>
              <input type="text" placeholder="Department *" value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="clay-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Validity & Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" placeholder="Effective Date *" value={formData.effectiveDate} onChange={(e) => handleInputChange('effectiveDate', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="date" placeholder="Expiry Date (Optional)" value={formData.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} className="clay-input px-4 py-3 text-white" />
              <input type="text" placeholder="Contact Person *" value={formData.contactPerson} onChange={(e) => handleInputChange('contactPerson', e.target.value)} className="clay-input px-4 py-3 text-white" required />
              <input type="email" placeholder="Contact Email *" value={formData.contactEmail} onChange={(e) => handleInputChange('contactEmail', e.target.value)} className="clay-input px-4 py-3 text-white" required />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate('/instruction')} className="px-6 py-3 clay-card text-gray-300 hover:text-white">Cancel</button>
            <button type="submit" disabled={loading} className="ccs-orange-btn px-6 py-3 text-white flex items-center space-x-2 disabled:opacity-50">
              <Save size={20} />
              <span>{loading ? 'Saving...' : 'Save Instruction'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInstruction;

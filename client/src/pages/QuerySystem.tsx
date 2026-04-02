import React, { useState, useEffect } from 'react';
import { Search, Filter, Users, X, ChevronDown } from 'lucide-react';
import { api } from '../services/apiService';

interface Student {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  currentEnrollment: {
    studentId: string;
    program: string;
    yearLevel: number;
    section: string;
  };
  skills: {
    technicalSkills: Array<{
      skillName: string;
      proficiency: string;
    }>;
  };
  affiliations: {
    organizations: Array<{
      orgName: string;
      type: string;
    }>;
  };
  nonAcademicActivities: {
    sports: Array<{
      sportName: string;
      position: string;
    }>;
  };
}

const QuerySystem: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter options
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  const [availableSports, setAvailableSports] = useState<string[]>([]);
  const [availableOrganizations, setAvailableOrganizations] = useState<string[]>([]);
  const [availablePrograms, setAvailablePrograms] = useState<string[]>([]);
  
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [] as string[],
    sports: [] as string[],
    organizations: [] as string[],
    programs: [] as string[],
    yearLevels: [] as string[]
  });

  useEffect(() => {
    fetchFilterOptions();
    fetchAllStudents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [students, selectedFilters, searchTerm]);

  const fetchFilterOptions = async () => {
    try {
      const [skillsRes, sportsRes, orgsRes, programsRes] = await Promise.all([
        api.get('/query/filters/skills'),
        api.get('/query/filters/sports'),
        api.get('/query/filters/organizations'),
        api.get('/query/filters/programs')
      ]);

      setAvailableSkills(skillsRes.data || []);
      setAvailableSports(sportsRes.data || []);
      setAvailableOrganizations(orgsRes.data || []);
      setAvailablePrograms(programsRes.data || []);
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const fetchAllStudents = async () => {
    try {
      setLoading(true);
      const data = await api.get('/students');
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = students;

    // Text search
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.personalInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.personalInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.currentEnrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Skills filter
    if (selectedFilters.skills.length > 0) {
      filtered = filtered.filter(student =>
        student.skills.technicalSkills.some(skill =>
          selectedFilters.skills.includes(skill.skillName)
        )
      );
    }

    // Sports filter
    if (selectedFilters.sports.length > 0) {
      filtered = filtered.filter(student =>
        student.nonAcademicActivities.sports.some(sport =>
          selectedFilters.sports.includes(sport.sportName)
        )
      );
    }

    // Organizations filter
    if (selectedFilters.organizations.length > 0) {
      filtered = filtered.filter(student =>
        student.affiliations.organizations.some(org =>
          selectedFilters.organizations.includes(org.orgName)
        )
      );
    }

    // Programs filter
    if (selectedFilters.programs.length > 0) {
      filtered = filtered.filter(student =>
        selectedFilters.programs.includes(student.currentEnrollment.program)
      );
    }

    // Year levels filter
    if (selectedFilters.yearLevels.length > 0) {
      filtered = filtered.filter(student =>
        selectedFilters.yearLevels.includes(student.currentEnrollment.yearLevel.toString())
      );
    }

    setFilteredStudents(filtered);
  };

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      skills: [],
      sports: [],
      organizations: [],
      programs: [],
      yearLevels: []
    });
    setSearchTerm('');
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((count, filterArray) => count + filterArray.length, 0) + (searchTerm ? 1 : 0);
  };

  const exampleQueries = [
    {
      name: 'Students with Basketball Skills',
      action: () => handleFilterChange('sports', 'Basketball')
    },
    {
      name: 'Students with Programming Skills',
      action: () => handleFilterChange('skills', 'Programming')
    },
    {
      name: 'BSIT Students',
      action: () => handleFilterChange('programs', 'BSIT')
    },
    {
      name: '3rd Year Students',
      action: () => handleFilterChange('yearLevels', '3')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <Search size={32} className="mr-3" />
          Student Query System
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">
            {filteredStudents.length} of {students.length} students
          </span>
        </div>
      </div>

      {/* Example Queries */}
      <div className="clay-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Example Queries</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {exampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={query.action}
              className="clay-badge px-4 py-2 text-white text-sm hover:scale-105 transition-transform"
            >
              {query.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="clay-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, student ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="clay-input w-full pl-10 pr-4 py-3 text-white placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ccs-orange-btn px-4 py-3 text-white flex items-center justify-center space-x-2"
          >
            <Filter size={20} />
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {getActiveFilterCount()}
              </span>
            )}
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showFilters && (
          <div className="space-y-6 border-t border-white border-opacity-10 pt-6">
            {/* Skills Filter */}
            <div>
              <h4 className="text-white font-medium mb-3">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleFilterChange('skills', skill)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedFilters.skills.includes(skill)
                        ? 'ccs-orange-btn text-white'
                        : 'clay-badge text-gray-300 hover:text-white'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Sports Filter */}
            <div>
              <h4 className="text-white font-medium mb-3">Sports</h4>
              <div className="flex flex-wrap gap-2">
                {availableSports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => handleFilterChange('sports', sport)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedFilters.sports.includes(sport)
                        ? 'ccs-orange-btn text-white'
                        : 'clay-badge text-gray-300 hover:text-white'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Organizations Filter */}
            <div>
              <h4 className="text-white font-medium mb-3">Organizations</h4>
              <div className="flex flex-wrap gap-2">
                {availableOrganizations.map((org) => (
                  <button
                    key={org}
                    onClick={() => handleFilterChange('organizations', org)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedFilters.organizations.includes(org)
                        ? 'ccs-orange-btn text-white'
                        : 'clay-badge text-gray-300 hover:text-white'
                    }`}
                  >
                    {org}
                  </button>
                ))}
              </div>
            </div>

            {/* Programs Filter */}
            <div>
              <h4 className="text-white font-medium mb-3">Programs</h4>
              <div className="flex flex-wrap gap-2">
                {availablePrograms.map((program) => (
                  <button
                    key={program}
                    onClick={() => handleFilterChange('programs', program)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedFilters.programs.includes(program)
                        ? 'ccs-orange-btn text-white'
                        : 'clay-badge text-gray-300 hover:text-white'
                    }`}
                  >
                    {program}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Levels Filter */}
            <div>
              <h4 className="text-white font-medium mb-3">Year Levels</h4>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4'].map((year) => (
                  <button
                    key={year}
                    onClick={() => handleFilterChange('yearLevels', year)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      selectedFilters.yearLevels.includes(year)
                        ? 'ccs-orange-btn text-white'
                        : 'clay-badge text-gray-300 hover:text-white'
                    }`}
                  >
                    {year}st Year
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {getActiveFilterCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
                <span>Clear all filters</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
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
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white text-sm">{student.personalInfo.email}</span>
                </div>
                
                {/* Show skills */}
                {student.skills.technicalSkills.length > 0 && (
                  <div className="mt-3">
                    <span className="text-gray-400 text-sm">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {student.skills.technicalSkills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="clay-badge px-2 py-1 text-xs text-white">
                          {skill.skillName}
                        </span>
                      ))}
                      {student.skills.technicalSkills.length > 3 && (
                        <span className="text-gray-400 text-xs">+{student.skills.technicalSkills.length - 3} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredStudents.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400 text-lg">No students found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default QuerySystem;

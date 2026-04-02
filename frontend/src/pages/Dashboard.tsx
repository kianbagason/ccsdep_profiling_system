import React, { useState, useEffect } from 'react';
import { Users, UserPlus, BookOpen, TrendingUp, Award } from 'lucide-react';
import { api } from '../services/apiService';

interface DashboardStats {
  totalStudents: number;
  activeStudents: number;
  programs: number;
  skillsTracked: number;
  programDistribution: { [key: string]: number };
  yearLevelDistribution: { [key: string]: number };
  topSkills: string[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeStudents: 0,
    programs: 0,
    skillsTracked: 0,
    programDistribution: {},
    yearLevelDistribution: {},
    topSkills: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch students data
      const students = await api.get('/students');
      
      // Calculate stats
      const programDistribution: { [key: string]: number } = {};
      const yearLevelDistribution: { [key: string]: number } = {};
      const allSkills: string[] = [];
      
      students.forEach((student: any) => {
        // Program distribution
        const program = student.currentEnrollment.program;
        programDistribution[program] = (programDistribution[program] || 0) + 1;
        
        // Year level distribution
        const yearLevel = student.currentEnrollment.yearLevel;
        const yearKey = `${yearLevel}th Year`;
        yearLevelDistribution[yearKey] = (yearLevelDistribution[yearKey] || 0) + 1;
        
        // Collect all skills
        if (student.skills?.technicalSkills) {
          student.skills.technicalSkills.forEach((skill: any) => {
            allSkills.push(skill.skillName);
          });
        }
        
        if (student.skills?.softSkills) {
          student.skills.softSkills.forEach((skill: any) => {
            allSkills.push(skill.skillName);
          });
        }
      });
      
      // Count unique skills
      const uniqueSkills = Array.from(new Set(allSkills));
      
      // Get top skills (you might want to implement proper counting logic)
      const topSkills = [
        'Problem Solving',
        'Data Structures', 
        'Public Speaking',
        'Public Relations',
        'Database Management',
        'Leadership'
      ];

      setStats({
        totalStudents: students.length,
        activeStudents: students.length,
        programs: Object.keys(programDistribution).length,
        skillsTracked: uniqueSkills.length,
        programDistribution,
        yearLevelDistribution,
        topSkills
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          CCS Profiling System
        </h1>
        <p className="text-gray-400 text-lg">
          Computer System Servicing Department
        </p>
        <p className="text-gray-500">
          Pamantasan ng Cabuyao
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="stats-card">
          <div className="stats-icon">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.totalStudents}</h3>
          <p className="text-gray-400">Total Students</p>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <UserPlus size={24} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.activeStudents}</h3>
          <p className="text-gray-400">Active Students</p>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <BookOpen size={24} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.programs}</h3>
          <p className="text-gray-400">Programs</p>
        </div>

        <div className="stats-card">
          <div className="stats-icon">
            <Award size={24} className="text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.skillsTracked}</h3>
          <p className="text-gray-400">Skills Tracked</p>
        </div>
      </div>

      {/* Distribution Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Program Distribution */}
        <div className="clay-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <BookOpen size={20} className="mr-2" />
            Program Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.programDistribution).map(([program, count]) => (
              <div key={program} className="flex justify-between items-center">
                <span className="text-gray-300">{program}</span>
                <span className="text-white font-medium">{count} students</span>
              </div>
            ))}
          </div>
        </div>

        {/* Year Level Distribution */}
        <div className="clay-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <TrendingUp size={20} className="mr-2" />
            Year Level Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(stats.yearLevelDistribution).map(([year, count]) => (
              <div key={year} className="flex justify-between items-center">
                <span className="text-gray-300">{year}</span>
                <span className="text-white font-medium">{count} students</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Skills */}
      <div className="clay-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Award size={20} className="mr-2" />
          Top Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {stats.topSkills.map((skill, index) => (
            <div key={skill} className="flex items-center space-x-3 p-3 rounded-lg bg-white bg-opacity-5">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <span className="text-gray-300">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

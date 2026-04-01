const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST comprehensive query for students
router.post('/students', async (req, res) => {
  try {
    const {
      skills,
      activities,
      organizations,
      programs,
      yearLevels,
      sports,
      violations,
      textSearch
    } = req.body;

    let query = {};

    // Text search across personal information
    if (textSearch) {
      query.$or = [
        { 'personalInfo.firstName': { $regex: textSearch, $options: 'i' } },
        { 'personalInfo.lastName': { $regex: textSearch, $options: 'i' } },
        { 'personalInfo.email': { $regex: textSearch, $options: 'i' } },
        { 'currentEnrollment.studentId': { $regex: textSearch, $options: 'i' } }
      ];
    }

    // Filter by technical skills
    if (skills && skills.length > 0) {
      query['skills.technicalSkills.skillName'] = { $in: skills };
    }

    // Filter by non-academic activities (sports)
    if (sports && sports.length > 0) {
      query['nonAcademicActivities.sports.sportName'] = { $in: sports };
    }

    // Filter by organizations
    if (organizations && organizations.length > 0) {
      query['affiliations.organizations.orgName'] = { $in: organizations };
    }

    // Filter by programs
    if (programs && programs.length > 0) {
      query['currentEnrollment.program'] = { $in: programs };
    }

    // Filter by year levels
    if (yearLevels && yearLevels.length > 0) {
      query['currentEnrollment.yearLevel'] = { $in: yearLevels };
    }

    // Filter by violations (if any violation records exist)
    if (violations && violations.length > 0) {
      query['violations.disciplinaryRecords.violationType'] = { $in: violations };
    }

    const students = await Student.find(query)
      .sort({ 'personalInfo.lastName': 1, 'personalInfo.firstName': 1 })
      .select('-__v');

    res.json({
      success: true,
      count: students.length,
      data: students,
      filters: {
        skills,
        activities,
        organizations,
        programs,
        yearLevels,
        sports,
        violations,
        textSearch
      }
    });

  } catch (error) {
    console.error('Query error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error executing query',
      error: error.message 
    });
  }
});

// GET students with specific skill
router.get('/students/skill/:skillName', async (req, res) => {
  try {
    const students = await Student.find({
      'skills.technicalSkills.skillName': { $regex: req.params.skillName, $options: 'i' }
    })
      .sort({ 'personalInfo.lastName': 1 })
      .select('-__v');

    res.json({
      success: true,
      count: students.length,
      skill: req.params.skillName,
      data: students
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error finding students with skill',
      error: error.message 
    });
  }
});

// GET students with specific sport
router.get('/students/sport/:sportName', async (req, res) => {
  try {
    const students = await Student.find({
      'nonAcademicActivities.sports.sportName': { $regex: req.params.sportName, $options: 'i' }
    })
      .sort({ 'personalInfo.lastName': 1 })
      .select('-__v');

    res.json({
      success: true,
      count: students.length,
      sport: req.params.sportName,
      data: students
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error finding students with sport',
      error: error.message 
    });
  }
});

// GET students in specific organization
router.get('/students/organization/:orgName', async (req, res) => {
  try {
    const students = await Student.find({
      'affiliations.organizations.orgName': { $regex: req.params.orgName, $options: 'i' }
    })
      .sort({ 'personalInfo.lastName': 1 })
      .select('-__v');

    res.json({
      success: true,
      count: students.length,
      organization: req.params.orgName,
      data: students
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error finding students in organization',
      error: error.message 
    });
  }
});

// GET all available skills for filtering
router.get('/filters/skills', async (req, res) => {
  try {
    const skills = await Student.distinct('skills.technicalSkills.skillName');
    res.json({
      success: true,
      data: skills.sort()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching skills',
      error: error.message 
    });
  }
});

// GET all available sports for filtering
router.get('/filters/sports', async (req, res) => {
  try {
    const sports = await Student.distinct('nonAcademicActivities.sports.sportName');
    res.json({
      success: true,
      data: sports.sort()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching sports',
      error: error.message 
    });
  }
});

// GET all available organizations for filtering
router.get('/filters/organizations', async (req, res) => {
  try {
    const organizations = await Student.distinct('affiliations.organizations.orgName');
    res.json({
      success: true,
      data: organizations.sort()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching organizations',
      error: error.message 
    });
  }
});

// GET all available programs for filtering
router.get('/filters/programs', async (req, res) => {
  try {
    const programs = await Student.distinct('currentEnrollment.program');
    res.json({
      success: true,
      data: programs.sort()
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching programs',
      error: error.message 
    });
  }
});

module.exports = router;

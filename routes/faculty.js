const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// GET all faculty
router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ 'personalInfo.lastName': 1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET faculty by ID
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET faculty by employee ID
router.get('/employee-id/:employeeId', async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ 'employmentDetails.employeeId': req.params.employeeId });
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new faculty
router.post('/', async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update faculty
router.put('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE faculty
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.json({ message: 'Faculty deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET faculty by department
router.get('/department/:department', async (req, res) => {
  try {
    const faculty = await Faculty.find({ 'employmentDetails.department': req.params.department })
      .sort({ 'personalInfo.lastName': 1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET faculty by rank
router.get('/rank/:rank', async (req, res) => {
  try {
    const faculty = await Faculty.find({ 'employmentDetails.rank': req.params.rank })
      .sort({ 'personalInfo.lastName': 1 });
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

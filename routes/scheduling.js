const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// GET all schedules
router.get('/', async (req, res) => {
  try {
    const { 
      semester, 
      academicYear, 
      program, 
      department, 
      facultyId,
      building,
      day 
    } = req.query;
    
    let filter = {};
    
    if (semester) filter['academicDetails.semester'] = semester;
    if (academicYear) filter['academicDetails.academicYear'] = academicYear;
    if (program) filter['academicDetails.program'] = program;
    if (department) filter['academicDetails.department'] = department;
    if (facultyId) filter['faculty.employeeId'] = facultyId;
    if (building) filter['room.building'] = building;
    if (day) filter['schedule.days'] = day;
    
    const schedules = await Schedule.find(filter).sort({ 'schedule.startTime': 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new schedule
router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update schedule
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET schedules by faculty
router.get('/faculty/:facultyId', async (req, res) => {
  try {
    const schedules = await Schedule.find({ 'faculty.employeeId': req.params.facultyId })
      .sort({ 'schedule.startTime': 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET schedules by course
router.get('/course/:courseCode', async (req, res) => {
  try {
    const schedules = await Schedule.find({ 'course.code': req.params.courseCode })
      .sort({ 'schedule.startTime': 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET schedules by room
router.get('/room/:building/:roomNumber', async (req, res) => {
  try {
    const schedules = await Schedule.find({ 
      'room.building': req.params.building,
      'room.roomNumber': req.params.roomNumber 
    })
      .sort({ 'schedule.startTime': 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET schedules by day
router.get('/day/:day', async (req, res) => {
  try {
    const schedules = await Schedule.find({ 'schedule.days': req.params.day })
      .sort({ 'schedule.startTime': 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

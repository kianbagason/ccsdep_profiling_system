const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const { 
      type, 
      category, 
      status, 
      department,
      startDate,
      endDate 
    } = req.query;
    
    let filter = {};
    
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (department) filter['organizer.department'] = department;
    
    if (startDate && endDate) {
      filter['schedule.startDate'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const events = await Event.find(filter).sort({ 'schedule.startDate': 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new event
router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body);
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET events by type
router.get('/type/:type', async (req, res) => {
  try {
    const events = await Event.find({ type: req.params.type })
      .sort({ 'schedule.startDate': 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET events by category
router.get('/category/:category', async (req, res) => {
  try {
    const events = await Event.find({ category: req.params.category })
      .sort({ 'schedule.startDate': 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET events by status
router.get('/status/:status', async (req, res) => {
  try {
    const events = await Event.find({ status: req.params.status })
      .sort({ 'schedule.startDate': 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET upcoming events
router.get('/upcoming/limit/:limit', async (req, res) => {
  try {
    const events = await Event.find({ 
      status: { $in: ['Planning', 'Upcoming'] },
      'schedule.startDate': { $gte: new Date() }
    })
      .sort({ 'schedule.startDate': 1 })
      .limit(parseInt(req.params.limit));
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

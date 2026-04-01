const express = require('express');
const router = express.Router();
const Instruction = require('../models/Instruction');

// GET all instructional materials
router.get('/', async (req, res) => {
  try {
    const { type, courseCode, department, program, academicYear, semester } = req.query;
    let filter = {};
    
    if (type) filter.type = type;
    if (courseCode) filter.courseCode = courseCode;
    if (department) filter.department = department;
    if (program) filter.program = program;
    if (academicYear) filter.academicYear = academicYear;
    if (semester) filter.semester = semester;
    
    const instruction = await Instruction.find(filter).sort({ createdAt: -1 });
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET instruction by ID
router.get('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findById(req.params.id);
    if (!instruction) {
      return res.status(404).json({ message: 'Instructional material not found' });
    }
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new instructional material
router.post('/', async (req, res) => {
  try {
    const instruction = new Instruction(req.body);
    const newInstruction = await instruction.save();
    res.status(201).json(newInstruction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update instructional material
router.put('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!instruction) {
      return res.status(404).json({ message: 'Instructional material not found' });
    }
    res.json(instruction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE instructional material
router.delete('/:id', async (req, res) => {
  try {
    const instruction = await Instruction.findByIdAndDelete(req.params.id);
    if (!instruction) {
      return res.status(404).json({ message: 'Instructional material not found' });
    }
    res.json({ message: 'Instructional material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET instructions by course code
router.get('/course/:courseCode', async (req, res) => {
  try {
    const instruction = await Instruction.find({ courseCode: req.params.courseCode })
      .sort({ createdAt: -1 });
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET instructions by type
router.get('/type/:type', async (req, res) => {
  try {
    const instruction = await Instruction.find({ type: req.params.type })
      .sort({ createdAt: -1 });
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET instructions by author
router.get('/author/:author', async (req, res) => {
  try {
    const instruction = await Instruction.find({ author: req.params.author })
      .sort({ createdAt: -1 });
    res.json(instruction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

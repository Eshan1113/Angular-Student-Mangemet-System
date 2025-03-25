const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isActive: true }
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, duration, price, category, level } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        duration: parseInt(duration),
        price: parseFloat(price),
        category,
        level,
        isActive: true
      }
    });

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, duration, price, category, level, isActive } = req.body;

  try {
    let course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    course = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: title || course.title,
        description: description || course.description,
        duration: duration ? parseInt(duration) : course.duration,
        price: price ? parseFloat(price) : course.price,
        category: category || course.category,
        level: level || course.level,
        isActive: isActive !== undefined ? isActive : course.isActive
      }
    });

    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Soft delete by setting isActive to false
    await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: false }
    });

    res.json({ message: 'Course removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};
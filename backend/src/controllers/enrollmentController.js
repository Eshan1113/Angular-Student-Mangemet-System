const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

// @desc    Get all enrollments
// @route   GET /api/enrollments
// @access  Private/Admin
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: true
      }
    });
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get my enrollments
// @route   GET /api/enrollments/my-enrollments
// @access  Private
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: {
        course: true
      }
    });
    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get single enrollment
// @route   GET /api/enrollments/:id
// @access  Private/Admin
const getEnrollment = async (req, res) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: true
      }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create an enrollment
// @route   POST /api/enrollments
// @access  Private/Admin
const createEnrollment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, courseId, status } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: parseInt(courseId) }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if enrollment already exists
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        userId: parseInt(userId),
        courseId: parseInt(courseId)
      }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'User is already enrolled in this course' });
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: parseInt(userId),
        courseId: parseInt(courseId),
        status: status || 'ACTIVE'
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: true
      }
    });

    res.status(201).json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update an enrollment
// @route   PUT /api/enrollments/:id
// @access  Private/Admin
const updateEnrollment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status } = req.body;

  try {
    let enrollment = await prisma.enrollment.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    enrollment = await prisma.enrollment.update({
      where: { id: parseInt(req.params.id) },
      data: {
        status: status || enrollment.status
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: true
      }
    });

    res.json(enrollment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete an enrollment
// @route   DELETE /api/enrollments/:id
// @access  Private/Admin
const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    await prisma.enrollment.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: 'Enrollment removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getEnrollments,
  getMyEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
};
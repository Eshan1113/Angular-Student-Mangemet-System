const express = require('express');
const { 
  getCourses, 
  getCourse, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, admin, createCourse);

router.route('/:id')
  .get(getCourse)
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse);

module.exports = router;
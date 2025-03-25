const express = require('express');
const { 
  getEnrollments, 
  getEnrollment, 
  createEnrollment, 
  updateEnrollment, 
  deleteEnrollment,
  getMyEnrollments
} = require('../controllers/enrollmentController');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, admin, getEnrollments)
  .post(protect, admin, createEnrollment);

router.route('/my-enrollments')
  .get(protect, getMyEnrollments);

router.route('/:id')
  .get(protect, admin, getEnrollment)
  .put(protect, admin, updateEnrollment)
  .delete(protect, admin, deleteEnrollment);

module.exports = router;
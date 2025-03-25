const { body } = require('express-validator');

const enrollmentValidator = [
  body('userId').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
  body('courseId').isInt({ min: 1 }).withMessage('Course ID must be a positive integer'),
  body('status').optional().isIn(['ACTIVE', 'COMPLETED', 'CANCELLED']).withMessage('Invalid status')
];

module.exports = {
  enrollmentValidator
};
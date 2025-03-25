const { body } = require('express-validator');

const userRegisterValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required')
];

const userLoginValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const adminCreateUserValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('role').optional().isIn(['ADMIN', 'STUDENT']).withMessage('Invalid role')
];

const adminUpdateUserValidator = [
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('firstName').optional().notEmpty().withMessage('First name is required'),
  body('lastName').optional().notEmpty().withMessage('Last name is required'),
  body('role').optional().isIn(['ADMIN', 'STUDENT']).withMessage('Invalid role')
];

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  adminCreateUserValidator,
  adminUpdateUserValidator
};
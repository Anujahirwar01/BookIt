import express from 'express';
import { body, validationResult } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// validation result handler
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

// Register: require username, email and password
router.post(
    '/register',
    [
        body('username').trim().notEmpty().withMessage('username is required'),
        body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
        body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters')
    ],
    handleValidation,
    register
);

// Login: require email and password
router.post(
    '/login',
    [
        body('email').isEmail().withMessage('valid email is required').normalizeEmail(),
        body('password').notEmpty().withMessage('password is required')
    ],
    handleValidation,
    login
);

export default router;

import express from 'express';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to authenticate user
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Handle both old format (id) and new format (userId) for backward compatibility
        const userId = decoded.userId || decoded.id;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token format.' });
        }

        req.userId = userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// Create a new booking
router.post('/create', authenticateUser, async (req, res) => {
    try {
        const {
            propertyId,
            propertyTitle,
            propertyLocation,
            propertyImage,
            quantity,
            selectedDate,
            selectedTime,
            pricePerUnit,
            subtotal,
            taxes,
            totalAmount
        } = req.body;

        // Validate required fields
        if (!propertyId || !propertyTitle || !quantity || !selectedDate || !selectedTime || !subtotal || !totalAmount) {
            return res.status(400).json({
                message: 'Missing required booking information'
            });
        }

        // Create new booking
        const booking = new Booking({
            userId: req.userId,
            propertyId,
            propertyTitle,
            propertyLocation,
            propertyImage,
            quantity,
            selectedDate,
            selectedTime,
            pricePerUnit,
            subtotal,
            taxes: taxes || 59,
            totalAmount
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            booking: {
                ticketNumber: booking.ticketNumber,
                propertyTitle: booking.propertyTitle,
                selectedDate: booking.selectedDate,
                selectedTime: booking.selectedTime,
                quantity: booking.quantity,
                totalAmount: booking.totalAmount,
                bookingDate: booking.bookingDate
            }
        });
    } catch (error) {
        console.error('Booking creation error:', error);
        res.status(500).json({
            message: 'Failed to create booking',
            error: error.message
        });
    }
});

// Get user's bookings
router.get('/my-bookings', authenticateUser, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.userId })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
});

// Get booking by ticket number
router.get('/ticket/:ticketNumber', authenticateUser, async (req, res) => {
    try {
        const { ticketNumber } = req.params;

        const booking = await Booking.findOne({
            ticketNumber,
            userId: req.userId
        });

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            booking
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({
            message: 'Failed to fetch booking',
            error: error.message
        });
    }
});

// Cancel booking
router.patch('/cancel/:ticketNumber', authenticateUser, async (req, res) => {
    try {
        const { ticketNumber } = req.params;

        const booking = await Booking.findOneAndUpdate(
            { ticketNumber, userId: req.userId },
            { bookingStatus: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({
            message: 'Failed to cancel booking',
            error: error.message
        });
    }
});

export default router;
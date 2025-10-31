import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';


import authRouter from './routes/auth.js';
import bookingRouter from './routes/booking.js';

const app = express();

// Middleware
// Normalize allowed origin(s) and handle trailing slash mismatch between stored FRONTEND_URL and request origin.
const rawFrontend = process.env.FRONTEND_URL || 'http://localhost:5174';
const allowedOrigins = rawFrontend
    .split(',')
    .map(u => u.trim())
    .filter(Boolean)
    .map(u => u.replace(/\/+$/, '')); // remove trailing slashes

const corsOptions = {
    origin: function (origin, callback) {
        // Allow non-browser requests (e.g., server-to-server, curl) where origin is undefined
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/+$/, '');
        if (allowedOrigins.indexOf(normalizedOrigin) !== -1) {
            return callback(null, true);
        }

        console.warn('CORS origin denied:', origin, 'normalized:', normalizedOrigin, 'allowed:', allowedOrigins);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingRouter);


app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'BookIt API' });
});

export default app;

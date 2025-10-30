import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';


import authRouter from './routes/auth.js';
import bookingRouter from './routes/booking.js';

const app = express();

// Middleware
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5174',
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

import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './db/index.js';

const PORT = process.env.PORT;

async function start() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message || err);
        process.exit(1);
    }
}

start();

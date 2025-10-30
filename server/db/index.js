import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, {
            // useNewUrlParser, useUnifiedTopology are defaults in Mongoose 6+
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err.message || err);
        throw err;
    }
}

export default connectDB;

import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyId: {
        type: Number,
        required: true
    },
    propertyTitle: {
        type: String,
        required: true
    },
    propertyLocation: {
        type: String,
        required: true
    },
    propertyImage: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    selectedDate: {
        type: String,
        required: true
    },
    selectedTime: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    taxes: {
        type: Number,
        default: 59
    },
    totalAmount: {
        type: Number,
        required: true
    },
    bookingStatus: {
        type: String,
        enum: ['confirmed', 'cancelled', 'completed'],
        default: 'confirmed'
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Generate ticket number before saving
bookingSchema.pre('save', function (next) {
    if (!this.ticketNumber) {
        // Generate random 8-digit ticket number
        this.ticketNumber = 'BK' + Math.floor(10000000 + Math.random() * 90000000);
    }
    next();
});

export default mongoose.model('Booking', bookingSchema);
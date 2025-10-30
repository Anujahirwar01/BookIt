import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Booking {
    _id: string;
    ticketNumber: string;
    propertyId: number;
    propertyTitle: string;
    propertyLocation: string;
    propertyImage: string;
    quantity: number;
    selectedDate: string;
    selectedTime: string;
    pricePerUnit: number;
    subtotal: number;
    taxes: number;
    totalAmount: number;
    bookingStatus: 'confirmed' | 'cancelled' | 'completed';
    bookingDate: string;
    createdAt: string;
}

const MyBookings = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/my-bookings`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                console.log('Bookings received:', response.data.bookings);
                console.log('First booking image:', response.data.bookings[0]?.propertyImage);
                setBookings(response.data.bookings);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCancelBooking = async (ticketNumber: string) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/bookings/cancel/${ticketNumber}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                // Refresh bookings list
                fetchBookings();
                alert('Booking cancelled successfully');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert('Failed to cancel booking');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header user={user} onLogout={handleLogout} />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading your bookings...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={user} onLogout={handleLogout} />

            <div className="max-w-6xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-sm font-medium">Back</span>
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
                    <p className="text-gray-600">Manage and track your travel bookings</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Bookings List */}
                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
                        <p className="text-gray-500 mb-6">Start exploring amazing properties and create your first booking!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            Explore Properties
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-md shadow-sm border border-gray-200 p-3">
                                <div className="flex flex-col gap-3">
                                    {/* Property Image */}
                                    <div className="w-full h-32">
                                        <img
                                            src={booking.propertyImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                                            alt={booking.propertyTitle}
                                            className="w-full h-full object-cover rounded-md"
                                            onError={(e) => {
                                                console.log('Image error for booking:', booking.ticketNumber, 'URL:', booking.propertyImage);
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                                            }}
                                        />
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex-1">
                                        <div className="flex flex-col">
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                                                    {booking.propertyTitle}
                                                </h3>
                                                <p className="text-xs text-gray-600 mb-2">{booking.propertyLocation}</p>

                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div>
                                                        <span className="font-medium text-gray-700">Ticket:</span>
                                                        <p className="text-gray-600">{booking.ticketNumber}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Date & Time:</span>
                                                        <p className="text-gray-600">{booking.selectedDate}, {booking.selectedTime}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Quantity:</span>
                                                        <p className="text-gray-600">{booking.quantity}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-700">Total:</span>
                                                        <p className="text-gray-900 font-semibold">₹{booking.totalAmount.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status and Actions */}
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(booking.bookingStatus)}`}>
                                                    {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                                                </span>

                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => navigate(`/property/${booking.propertyId}`)}
                                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] px-2 py-1 rounded transition-colors"
                                                    >
                                                        View
                                                    </button>

                                                    {booking.bookingStatus === 'confirmed' && (
                                                        <button
                                                            onClick={() => handleCancelBooking(booking.ticketNumber)}
                                                            className="bg-red-100 hover:bg-red-200 text-red-700 text-[10px] px-2 py-1 rounded transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Booking Date */}
                                <div className="mt-2 pt-2 border-t border-gray-100">
                                    <p className="text-[10px] text-gray-500">
                                        Booked on {new Date(booking.createdAt).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyBookings;
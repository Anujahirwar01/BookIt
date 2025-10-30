import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(username, email, password);
            navigate('/'); // Redirect to home after successful registration
        } catch (err: any) {
            if (err.response?.data?.errors) {
                // Handle validation errors from express-validator
                const messages = err.response.data.errors.map((error: any) => error.msg).join(', ');
                setError(messages);
            } else {
                setError(err.response?.data?.error || 'Registration failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-sm w-full">
                {/* Logo Section */}
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center space-x-2 mb-3">
                        <svg width="24" height="28" viewBox="0 0 40 48" className="text-yellow-500">
                            <path
                                d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 28 20 28s20-16.954 20-28C40 8.954 31.046 0 20 0z"
                                fill="currentColor"
                            />
                            <text x="20" y="18" textAnchor="middle" className="fill-black font-bold text-[10px]">hd</text>
                            <circle cx="20" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="16" cy="22" r="1" fill="currentColor" />
                            <circle cx="24" cy="22" r="1" fill="currentColor" />
                            <path d="M15 26 Q20 30 25 26" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-black leading-tight">highway</span>
                            <span className="text-sm font-bold text-black leading-tight">delite</span>
                        </div>
                    </div>
                </div>

                {/* Signup Card */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-6">
                        <div className="text-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800 mb-1">Join Highway Delite</h2>
                            <p className="text-gray-600 text-xs">Create your account to start exploring Karnataka</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-xs">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 text-sm text-gray-900 placeholder-gray-500"
                                        placeholder="Choose a username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 text-sm text-gray-900 placeholder-gray-500"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150 text-sm text-gray-900 placeholder-gray-500"
                                        placeholder="Create a password (min 6 characters)"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-2 px-3 rounded-md transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-center text-xs text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-yellow-600 hover:text-yellow-700 transition duration-150"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
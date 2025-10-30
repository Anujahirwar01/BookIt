import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/'); // Redirect to home after successful login
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-sm w-full mx-4">
                {/* Logo Section */}
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center space-x-2 mb-3">
                        <svg width="28" height="32" viewBox="0 0 40 48" className="text-yellow-500">
                            <path
                                d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 28 20 28s20-16.954 20-28C40 8.954 31.046 0 20 0z"
                                fill="currentColor"
                            />
                            <text x="20" y="18" textAnchor="middle" className="fill-black font-semibold text-xs">hd</text>
                            <circle cx="20" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="16" cy="22" r="1" fill="currentColor" />
                            <circle cx="24" cy="22" r="1" fill="currentColor" />
                            <path d="M15 26 Q20 30 25 26" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-black leading-tight">highway</span>
                            <span className="text-sm font-semibold text-black leading-tight">delite</span>
                        </div>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-6">
                        <div className="text-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-1">Welcome Back!</h2>
                            <p className="text-gray-600 text-xs">Sign in to continue your journey</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200 text-sm text-gray-900 placeholder-gray-500"
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200 text-sm text-gray-900 placeholder-gray-500"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-2 px-3 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                    </div>

                    <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                        <p className="text-center text-xs text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                className="font-medium text-yellow-600 hover:text-yellow-700 transition duration-200"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

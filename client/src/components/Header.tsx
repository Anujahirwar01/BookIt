import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    user: any;
    onLogout?: () => void;
    onSearch?: (searchTerm: string, filters: SearchFilters) => void;
}

interface SearchFilters {
    category: string;
    priceRange: string;
    rating: string;
}

const Header = ({ user, onLogout, onSearch }: HeaderProps) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<SearchFilters>({
        category: 'all',
        priceRange: 'all',
        rating: 'all'
    });

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (onSearch) {
            onSearch(searchTerm, filters);
        }
    };

    const handleSearchInputChange = (value: string) => {
        setSearchTerm(value);
        // Trigger immediate search on input change
        if (onSearch) {
            onSearch(value, filters);
        }
    };

    const handleFilterChange = (filterType: keyof SearchFilters, value: string) => {
        const newFilters = { ...filters, [filterType]: value };
        setFilters(newFilters);
        // Trigger immediate search when filters change
        if (onSearch) {
            onSearch(searchTerm, newFilters);
        }
    };

    return (
        <header className="bg-white shadow-md w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 w-full">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex items-center space-x-1.5">
                            {/* Highway Delite Logo */}
                            <div className="relative">
                                <svg width="24" height="28" viewBox="0 0 40 48" className="text-yellow-500">
                                    {/* Location Pin Shape */}
                                    <path
                                        d="M20 0C8.954 0 0 8.954 0 20c0 11.046 20 28 20 28s20-16.954 20-28C40 8.954 31.046 0 20 0z"
                                        fill="currentColor"
                                    />
                                    {/* HD Text */}
                                    <text x="20" y="18" textAnchor="middle" className="fill-black font-bold text-xs">hd</text>
                                    {/* Smiley Face */}
                                    <circle cx="20" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="1" />
                                    <circle cx="16" cy="22" r="1" fill="currentColor" />
                                    <circle cx="24" cy="22" r="1" fill="currentColor" />
                                    <path d="M15 26 Q20 30 25 26" stroke="currentColor" strokeWidth="1" fill="none" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-black leading-tight">highway</span>
                                <span className="text-sm font-bold text-black leading-tight">delite</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 mx-4 lg:mx-8">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search destinations, locations, or property types..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearchInputChange(e.target.value)}
                                    className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <svg className="h-4 w-4 text-gray-400 hover:text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Search Icon - Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-gray-700 hover:text-yellow-600"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* User Menu */}
                    <div className="relative">
                        {user ? (
                            <>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600"
                                >
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-800 text-sm font-medium">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden md:block font-medium">{user.username}</span>
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <div className="px-4 py-2 text-sm text-gray-500">{user.email}</div>
                                        <hr />
                                        <button
                                            onClick={() => {
                                                navigate('/my-bookings');
                                                setIsMenuOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            📋 My Bookings
                                        </button>
                                        <button
                                            onClick={onLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            🚪 Sign out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            // Guest user - show login/register buttons
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-gray-700 hover:text-yellow-600 font-medium"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Advanced Search Panel */}
                {isSearchOpen && (
                    <div className="border-t bg-gray-50 w-full">
                        <div className="px-3 py-3 w-full">
                            {/* Mobile Search Bar */}
                            <div className="md:hidden mb-3">
                                <form onSubmit={handleSearch}>
                                    <input
                                        type="text"
                                        placeholder="Search destinations..."
                                        value={searchTerm}
                                        onChange={(e) => handleSearchInputChange(e.target.value)}
                                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                </form>
                            </div>

                            {/* Filter Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Category</label>
                                    <select
                                        value={filters.category}
                                        onChange={(e) => handleFilterChange('category', e.target.value)}
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                                    >
                                        <option value="all">All Categories</option>
                                        <option value="Beach">🏖️ Beach</option>
                                        <option value="Mountain">🏔️ Mountain</option>
                                        <option value="Riverside">🏞️ Riverside</option>
                                        <option value="Forest">🌲 Forest</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Price Range</label>
                                    <select
                                        value={filters.priceRange}
                                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                                    >
                                        <option value="all">Any Price</option>
                                        <option value="low">₹800 - ₹1,500</option>
                                        <option value="medium">₹1,500 - ₹2,500</option>
                                        <option value="high">₹2,500+</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-0.5">Rating</label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                                    >
                                        <option value="all">Any Rating</option>
                                        <option value="4.5">4.5+ Stars</option>
                                        <option value="4.0">4.0+ Stars</option>
                                        <option value="3.5">3.5+ Stars</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        onClick={handleSearch}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-1.5 px-3 rounded text-xs transition duration-200"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>

                            <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-gray-500 gap-1">
                                <span>Use filters to find your perfect nature destination</span>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setFilters({ category: 'all', priceRange: 'all', rating: 'all' });
                                        if (onSearch) onSearch('', { category: 'all', priceRange: 'all', rating: 'all' });
                                    }}
                                    className="text-yellow-600 hover:text-yellow-700 whitespace-nowrap text-xs"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
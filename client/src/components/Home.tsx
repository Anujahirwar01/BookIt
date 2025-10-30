import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
// import SearchSection from './SearchSection';
import FeaturedSection from './FeaturedSection';
import Footer from './Footer';

interface SearchFilters {
    category: string;
    priceRange: string;
    rating: string;
}

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilters, setSearchFilters] = useState<SearchFilters>({
        category: 'all',
        priceRange: 'all',
        rating: 'all'
    });

    // Removed authentication check - Home page should be accessible to all users

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (term: string, filters: SearchFilters) => {
        setSearchTerm(term);
        setSearchFilters(filters);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header user={user} onLogout={user ? handleLogout : undefined} onSearch={handleSearch} />
            {/* <SearchSection /> */}
            <FeaturedSection searchTerm={searchTerm} searchFilters={searchFilters} />

            {/* Additional Sections */}
            <section className="py-8 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Why Choose Us */}
                        <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl">🏆</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Best Price Guarantee</h3>
                            <p className="text-sm text-gray-600">We match any lower price you find elsewhere</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl">🇮🇳</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Pan‑India Coverage</h3>
                            <p className="text-sm text-gray-600">Thousands of stays across India — from bustling metros to serene hill stations</p>
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <span className="text-xl">🛡️</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Secure Booking</h3>
                            <p className="text-sm text-gray-600">Your personal data and payments are safe with us</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-8 bg-gray-800">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                        Stay Updated with Great Deals
                    </h2>
                    <p className="text-sm text-gray-300 mb-6">
                        Subscribe to our newsletter and get exclusive offers
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full sm:flex-1 px-3 py-2 text-sm rounded-md border-0 focus:ring-2 focus:ring-yellow-300"
                        />
                        <button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium text-sm py-2 px-4 rounded-md transition duration-200">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
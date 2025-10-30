import { useState } from 'react';

const SearchSection = () => {
    const [searchData, setSearchData] = useState({
        location: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search data:', searchData);
        // TODO: Implement search functionality
    };

    return (
        <section className="relative bg-linear-to-r from-gray-100 to-gray-200 text-gray-800">
            <div className="absolute inset-0 bg-white opacity-50"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Find Your Perfect Stay
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600">
                        Discover amazing places to stay around the world
                    </p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Location */}
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Where
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search destination"
                                    value={searchData.location}
                                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                                />
                            </div>

                            {/* Check-in */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Check-in
                                </label>
                                <input
                                    type="date"
                                    value={searchData.checkIn}
                                    onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                                />
                            </div>

                            {/* Check-out */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Check-out
                                </label>
                                <input
                                    type="date"
                                    value={searchData.checkOut}
                                    onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                                />
                            </div>

                            {/* Guests */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Guests
                                </label>
                                <select
                                    value={searchData.guests}
                                    onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                                >
                                    <option value={1}>1 Guest</option>
                                    <option value={2}>2 Guests</option>
                                    <option value={3}>3 Guests</option>
                                    <option value={4}>4 Guests</option>
                                    <option value={5}>5+ Guests</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-bold py-4 px-8 rounded-lg transition duration-200 text-lg"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SearchSection;
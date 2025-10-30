import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchFilters {
    category: string;
    priceRange: string;
    rating: string;
}

interface FeaturedSectionProps {
    searchTerm?: string;
    searchFilters?: SearchFilters;
}

const FeaturedSection = ({ searchTerm = '', searchFilters }: FeaturedSectionProps) => {
    const navigate = useNavigate();
    const allProperties = [
        // Beach Properties
        {
            id: 1,
            title: "Luxury Beachfront Villa",
            location: "Gokarna",
            price: "₹3,500",
            rating: 4.9,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 2,
            title: "Tropical Beach House",
            location: "Murudeshwar",
            price: "₹2,200",
            rating: 4.8,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1520637836862-4d197d17c838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 3,
            title: "Ocean View Cottage",
            location: "Karwar",
            price: "₹2,500",
            rating: 4.7,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 4,
            title: "Seaside Retreat",
            location: "Udupi",
            price: "₹1,500",
            rating: 4.6,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        // Mountain Properties
        {
            id: 5,
            title: "Alpine Mountain Lodge",
            location: "Coorg",
            price: "₹1,800",
            rating: 4.8,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 6,
            title: "Cozy Mountain Cabin",
            location: "Chikmagalur",
            price: "₹1,400",
            rating: 4.7,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1464822759844-d150b343c3e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 7,
            title: "Himalayan Retreat",
            location: "Sakleshpur",
            price: "₹950",
            rating: 4.9,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 8,
            title: "Rocky Mountain Chalet",
            location: "Nandi Hills",
            price: "₹1,900",
            rating: 4.8,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        // Riverside Properties
        {
            id: 9,
            title: "Riverside Cottage",
            location: "Kabini",
            price: "₹1,450",
            rating: 4.6,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 10,
            title: "Waterfront Cabin",
            location: "Cauvery River",
            price: "₹1,200",
            rating: 4.5,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 11,
            title: "River Lodge",
            location: "Bhadra River",
            price: "₹1,650",
            rating: 4.7,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 12,
            title: "Lakeside Villa",
            location: "Sharavathi Valley",
            price: "₹2,300",
            rating: 4.8,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        // Forest Properties
        {
            id: 13,
            title: "Forest Treehouse",
            location: "Western Ghats",
            price: "₹1,300",
            rating: 4.9,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 14,
            title: "Woodland Cabin",
            location: "Kudremukh",
            price: "₹1,100",
            rating: 4.6,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 15,
            title: "Jungle Lodge",
            location: "Bandipur",
            price: "₹1,400",
            rating: 4.7,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        },
        {
            id: 16,
            title: "Pine Forest Retreat",
            location: "Agumbe",
            price: "₹1,250",
            rating: 4.8,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProperties, setFilteredProperties] = useState(allProperties);
    const propertiesPerPage = 8;

    // Filter properties based on search term and filters
    useEffect(() => {
        let filtered = allProperties;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                property.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (searchFilters?.category && searchFilters.category !== 'all') {
            filtered = filtered.filter(property => property.category === searchFilters.category);
        }

        // Filter by price range
        if (searchFilters?.priceRange && searchFilters.priceRange !== 'all') {
            filtered = filtered.filter(property => {
                const price = parseInt(property.price.replace('₹', '').replace(',', ''));
                switch (searchFilters.priceRange) {
                    case 'low': return price >= 800 && price <= 1500;
                    case 'medium': return price > 1500 && price <= 2500;
                    case 'high': return price > 2500;
                    default: return true;
                }
            });
        }

        // Filter by rating
        if (searchFilters?.rating && searchFilters.rating !== 'all') {
            const minRating = parseFloat(searchFilters.rating);
            filtered = filtered.filter(property => property.rating >= minRating);
        }

        setFilteredProperties(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, searchFilters]);

    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const currentProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {currentProperties.map((property) => (
                        <div key={property.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-32 object-cover"
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.src = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`;
                                    }}
                                />
                                <div className="absolute top-2 right-2 bg-white px-1.5 py-0.5 rounded-full text-xs font-medium text-gray-900">
                                    ⭐ {property.rating}
                                </div>
                            </div>

                            <div className="p-2.5">
                                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                                    {property.title}
                                </h3>
                                <p className="text-gray-600 mb-2 text-xs">
                                    📍 {property.location}
                                </p>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-bold text-gray-800">
                                        {property.price}
                                    </span>
                                    <span className="text-gray-500 text-xs">per night</span>
                                </div>
                                <button
                                    onClick={() => navigate(`/property/${property.id}`)}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-1.5 px-2 rounded-md transition duration-200 text-xs"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-4 space-x-1">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-2 py-1 rounded-full text-xs transition ${currentPage === pageNum
                                    ? 'bg-yellow-500 text-gray-800 font-medium'
                                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-xs"
                    >
                        Next
                    </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-4 text-sm text-gray-600">
                    {filteredProperties.length > 0 ? (
                        <>
                            Showing {startIndex + 1}-{Math.min(startIndex + propertiesPerPage, filteredProperties.length)} of {filteredProperties.length} nature destinations
                            {searchTerm && <span className="ml-2 text-yellow-600">for "{searchTerm}"</span>}
                        </>
                    ) : (
                        <span className="text-red-600">
                            No destinations found matching your search criteria. Try adjusting your filters.
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;
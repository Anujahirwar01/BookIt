import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    rating: number;
    category: string;
    image: string;
    description: string;
    amenities: string[];
    gallery: string[];
    host: {
        name: string;
        avatar: string;
        joinDate: string;
        rating: number;
    };
    rules: string[];
    nearbyPlaces: string[];
}

interface BookingData {
    ticketNumber: string;
    propertyTitle: string;
    propertyLocation: string;
    propertyImage: string;
    selectedDate: string;
    selectedTime: string;
    quantity: number;
    pricePerUnit: number;
    subtotal: number;
    taxes: number;
    totalAmount: number;
    status: string;
    createdAt: string;
}

const PropertyDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // Booking state
    const [quantity, setQuantity] = useState(1);
    const [selectedDate, setSelectedDate] = useState('Oct 22');
    const [selectedTime, setSelectedTime] = useState('07:00 am');
    const [showModal, setShowModal] = useState(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mock property data - in real app, fetch from API
    const properties: Property[] = [
        {
            id: 1,
            title: "Luxury Beachfront Villa",
            location: "Gokarna, Karnataka",
            price: "₹3,500",
            rating: 4.9,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Experience the ultimate luxury at this stunning beachfront villa in Gokarna. Wake up to breathtaking ocean views, enjoy private beach access, and relax in spacious, elegantly furnished rooms. Perfect for couples seeking a romantic getaway or families wanting an unforgettable beach vacation.",
            amenities: ["🏖️ Private Beach Access", "🏊‍♂️ Swimming Pool", "🍽️ Full Kitchen", "📶 Free WiFi", "❄️ Air Conditioning", "🚗 Free Parking", "🧺 Laundry Service", "🎯 Beach Activities"],
            gallery: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Rajesh Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2020", rating: 4.8 },
            rules: ["Check-in: 2:00 PM - 8:00 PM", "Check-out: 11:00 AM", "No smoking inside", "No parties or events", "Pet-friendly with prior approval"],
            nearbyPlaces: ["Om Beach - 2 km", "Kudle Beach - 1.5 km", "Gokarna Temple - 3 km", "Half Moon Beach - 4 km"]
        },
        {
            id: 2,
            title: "Tropical Beach House",
            location: "Murudeshwar, Karnataka",
            price: "₹2,200",
            rating: 4.8,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1520637836862-4d197d17c838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Escape to this charming tropical beach house in Murudeshwar, famous for its towering Shiva statue and pristine beaches. Enjoy the perfect blend of comfort and nature with stunning sea views from every room.",
            amenities: ["🌊 Beach View", "🍽️ Kitchen", "📶 WiFi", "❄️ AC", "🚗 Parking", "🏄‍♂️ Water Sports", "🎣 Fishing", "📺 TV"],
            gallery: ["https://images.unsplash.com/photo-1520637836862-4d197d17c838?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b189?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2019", rating: 4.7 },
            rules: ["Check-in: 1:00 PM - 9:00 PM", "Check-out: 10:00 AM", "No smoking", "Quiet hours 10 PM - 7 AM"],
            nearbyPlaces: ["Murudeshwar Temple - 1 km", "Statue of Shiva - 0.5 km", "Beach - 0.2 km", "Market - 2 km"]
        },
        {
            id: 3,
            title: "Ocean View Cottage",
            location: "Karwar, Karnataka",
            price: "₹2,500",
            rating: 4.7,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "A cozy ocean view cottage in Karwar offering stunning sunset views and peaceful beach walks. Perfect for nature lovers seeking tranquility by the Arabian Sea.",
            amenities: ["🌅 Sunset Views", "🏖️ Beach Access", "🍽️ Kitchen", "📶 WiFi", "❄️ AC", "🚗 Parking", "🚤 Boat Tours", "🐠 Snorkeling"],
            gallery: ["https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Kavya Nair", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2021", rating: 4.6 },
            rules: ["Check-in: 2:00 PM - 7:00 PM", "Check-out: 11:00 AM", "No smoking", "Respect marine life"],
            nearbyPlaces: ["Karwar Beach - 0.5 km", "Warship Museum - 2 km", "Oyster Rock - 3 km", "Rabindranath Tagore Beach - 5 km"]
        },
        {
            id: 4,
            title: "Seaside Retreat",
            location: "Udupi, Karnataka",
            price: "₹1,500",
            rating: 4.6,
            category: "Beach",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Comfortable seaside retreat in Udupi, known for its pristine beaches and delicious coastal cuisine. Experience authentic Karnataka beach culture.",
            amenities: ["🏖️ Beach Access", "🍽️ Kitchen", "📶 WiFi", "🚗 Parking", "🏊‍♂️ Swimming", "🎣 Fishing", "🥥 Coconut Grove", "📺 TV"],
            gallery: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Suresh Rao", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2020", rating: 4.5 },
            rules: ["Check-in: 1:00 PM - 8:00 PM", "Check-out: 10:00 AM", "No smoking", "Local cuisine available"],
            nearbyPlaces: ["Malpe Beach - 1 km", "St. Mary's Island - 6 km", "Udupi Temple - 4 km", "Manipal - 8 km"]
        },
        {
            id: 5,
            title: "Alpine Mountain Lodge",
            location: "Coorg, Karnataka",
            price: "₹1,800",
            rating: 4.8,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Nestled in the heart of Coorg's coffee plantations, this alpine lodge offers breathtaking mountain views and the perfect retreat from city life. Wake up to the aroma of fresh coffee and misty mountain air.",
            amenities: ["☕ Coffee Plantation Tours", "🏔️ Mountain Views", "🔥 Fireplace", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🚶‍♂️ Hiking Trails", "🌿 Garden"],
            gallery: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Arjun Reddy", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2018", rating: 4.9 },
            rules: ["Check-in: 3:00 PM - 7:00 PM", "Check-out: 11:00 AM", "No smoking indoors", "Mountain safety guidelines apply"],
            nearbyPlaces: ["Abbey Falls - 15 km", "Raja's Seat - 20 km", "Coffee Museum - 10 km", "Dubare Elephant Camp - 25 km"]
        },
        {
            id: 6,
            title: "Cozy Mountain Cabin",
            location: "Chikmagalur, Karnataka",
            price: "₹1,400",
            rating: 4.7,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1464822759844-d150b343c3e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Cozy mountain cabin surrounded by coffee estates and rolling hills. Perfect for trekking enthusiasts and coffee lovers seeking a peaceful mountain retreat.",
            amenities: ["☕ Coffee Estate", "🏔️ Trekking", "🔥 Bonfire", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🌄 Sunrise Views", "🦋 Wildlife"],
            gallery: ["https://images.unsplash.com/photo-1464822759844-d150b343c3e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Meera Gowda", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b189?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2019", rating: 4.6 },
            rules: ["Check-in: 2:00 PM - 6:00 PM", "Check-out: 10:00 AM", "No smoking", "Respect wildlife"],
            nearbyPlaces: ["Mullayanagiri Peak - 25 km", "Baba Budangiri - 20 km", "Hebbe Falls - 18 km", "Coffee Museum - 5 km"]
        },
        {
            id: 7,
            title: "Himalayan Retreat",
            location: "Sakleshpur, Karnataka",
            price: "₹950",
            rating: 4.9,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Serene mountain retreat in Sakleshpur offering spectacular valley views and cool climate. Ideal for nature photography and peaceful meditation.",
            amenities: ["🏔️ Valley Views", "📷 Photography Spots", "🚶‍♂️ Nature Walks", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🌿 Organic Garden", "🦅 Bird Watching"],
            gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Ravi Krishnan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2017", rating: 4.8 },
            rules: ["Check-in: 1:00 PM - 7:00 PM", "Check-out: 11:00 AM", "No smoking", "Eco-friendly practices encouraged"],
            nearbyPlaces: ["Manjarabad Fort - 12 km", "Bisle Ghat - 15 km", "Green Route Train - 8 km", "Sakleshpur Railway Station - 10 km"]
        },
        {
            id: 8,
            title: "Rocky Mountain Chalet",
            location: "Nandi Hills, Karnataka",
            price: "₹1,900",
            rating: 4.8,
            category: "Mountain",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Charming chalet at Nandi Hills with panoramic views and cool mountain air. Perfect for weekend getaways and romantic escapes near Bangalore.",
            amenities: ["🌄 Panoramic Views", "🚴‍♂️ Cycling", "🏰 Historical Sites", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🌅 Sunrise Point", "☁️ Cloud Views"],
            gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Anita Kulkarni", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2020", rating: 4.7 },
            rules: ["Check-in: 3:00 PM - 8:00 PM", "Check-out: 11:00 AM", "No smoking", "Early morning activities encouraged"],
            nearbyPlaces: ["Nandi Hills Fort - 2 km", "Tipu's Drop - 3 km", "Bhoga Nandeeshwara Temple - 5 km", "Bangalore - 60 km"]
        },
        {
            id: 9,
            title: "Riverside Cottage",
            location: "Kabini, Karnataka",
            price: "₹1,450",
            rating: 4.6,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Peaceful riverside cottage along the Kabini River with excellent wildlife spotting opportunities. Perfect for nature enthusiasts and wildlife photographers.",
            amenities: ["🐘 Wildlife Safari", "🚤 River Cruise", "📷 Photography", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🦅 Bird Watching", "🌊 River Access"],
            gallery: ["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Deepak Shetty", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2018", rating: 4.5 },
            rules: ["Check-in: 2:00 PM - 6:00 PM", "Check-out: 10:00 AM", "No smoking", "Wildlife protection guidelines"],
            nearbyPlaces: ["Kabini Dam - 3 km", "Nagarhole National Park - 5 km", "Tribal Museum - 8 km", "Bandipur - 15 km"]
        },
        {
            id: 10,
            title: "Waterfront Cabin",
            location: "Cauvery River, Karnataka",
            price: "₹1,200",
            rating: 4.5,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Rustic waterfront cabin along the sacred Cauvery River. Experience tranquil river life with fishing and peaceful water activities.",
            amenities: ["🎣 Fishing", "🚣‍♂️ Kayaking", "🌊 River Swimming", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🕊️ Peaceful Environment", "📚 Reading Nook"],
            gallery: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Lakshmi Devi", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b189?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2019", rating: 4.4 },
            rules: ["Check-in: 1:00 PM - 7:00 PM", "Check-out: 10:00 AM", "No smoking", "River safety guidelines"],
            nearbyPlaces: ["Cauvery Wildlife Sanctuary - 10 km", "Shivanasamudra Falls - 25 km", "Talakad - 20 km", "Mysore - 45 km"]
        },
        {
            id: 11,
            title: "River Lodge",
            location: "Bhadra River, Karnataka",
            price: "₹1,650",
            rating: 4.7,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Comfortable river lodge near Bhadra Wildlife Sanctuary with excellent opportunities for wildlife viewing and river activities.",
            amenities: ["🐅 Wildlife Sanctuary", "🚣‍♂️ River Activities", "🦅 Bird Sanctuary", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🌲 Nature Trails", "📷 Photography Tours"],
            gallery: ["https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Vinod Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2020", rating: 4.6 },
            rules: ["Check-in: 2:00 PM - 6:00 PM", "Check-out: 11:00 AM", "No smoking", "Wildlife sanctuary rules apply"],
            nearbyPlaces: ["Bhadra Wildlife Sanctuary - 2 km", "Kemmanagundi - 30 km", "Horanadu Temple - 35 km", "Chikmagalur - 40 km"]
        },
        {
            id: 12,
            title: "Lakeside Villa",
            location: "Sharavathi Valley, Karnataka",
            price: "₹2,300",
            rating: 4.8,
            category: "Riverside",
            image: "https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Luxurious lakeside villa in the scenic Sharavathi Valley offering stunning lake views and premium amenities for a memorable stay.",
            amenities: ["🏞️ Lake Views", "🚤 Boating", "🏊‍♂️ Swimming", "📶 WiFi", "🍽️ Full Kitchen", "🚗 Parking", "🌅 Sunset Views", "🎣 Fishing"],
            gallery: ["https://images.unsplash.com/photo-1464207687429-7505649dae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Ashwin Rao", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2021", rating: 4.7 },
            rules: ["Check-in: 3:00 PM - 7:00 PM", "Check-out: 11:00 AM", "No smoking", "Lake safety rules apply"],
            nearbyPlaces: ["Jog Falls - 15 km", "Linganamakki Dam - 5 km", "Sharavathi Adventure Camp - 8 km", "Sagara - 20 km"]
        },
        {
            id: 13,
            title: "Forest Treehouse",
            location: "Western Ghats, Karnataka",
            price: "₹1,300",
            rating: 4.9,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Unique treehouse experience in the Western Ghats surrounded by dense forest and rich biodiversity. Perfect for adventure seekers and nature lovers.",
            amenities: ["🌳 Treehouse Experience", "🦋 Biodiversity", "🚶‍♂️ Forest Trails", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🦅 Bird Watching", "🌿 Nature Photography"],
            gallery: ["https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Sanjay Patil", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2019", rating: 4.8 },
            rules: ["Check-in: 2:00 PM - 6:00 PM", "Check-out: 10:00 AM", "No smoking", "Forest conservation rules"],
            nearbyPlaces: ["Kudremukh National Park - 20 km", "Hornbill Research Foundation - 15 km", "Agumbe Rainforest - 25 km", "Shimoga - 40 km"]
        },
        {
            id: 14,
            title: "Woodland Cabin",
            location: "Kudremukh, Karnataka",
            price: "₹1,100",
            rating: 4.6,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Cozy woodland cabin in Kudremukh National Park area offering excellent trekking opportunities and pristine forest environment.",
            amenities: ["🏔️ Trekking", "🌲 Forest Views", "🦅 Wildlife Spotting", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🔥 Campfire", "🌿 Herb Garden"],
            gallery: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Geetha Nayak", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2018", rating: 4.5 },
            rules: ["Check-in: 1:00 PM - 6:00 PM", "Check-out: 10:00 AM", "No smoking", "Trekking permits required"],
            nearbyPlaces: ["Kudremukh Peak - 8 km", "Hanuman Gundi Falls - 12 km", "Kalasa - 15 km", "Horanadu - 25 km"]
        },
        {
            id: 15,
            title: "Jungle Lodge",
            location: "Bandipur, Karnataka",
            price: "₹1,400",
            rating: 4.7,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Authentic jungle lodge in Bandipur National Park offering incredible wildlife safari experiences and forest immersion.",
            amenities: ["🐅 Tiger Safari", "🐘 Elephant Spotting", "🦌 Deer Park", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🔭 Night Safari", "📷 Wildlife Photography"],
            gallery: ["https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Rajesh Gowda", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2017", rating: 4.6 },
            rules: ["Check-in: 2:00 PM - 5:00 PM", "Check-out: 10:00 AM", "No smoking", "Wildlife safari guidelines"],
            nearbyPlaces: ["Bandipur National Park - 2 km", "Mudumalai - 15 km", "Ooty - 80 km", "Mysore - 80 km"]
        },
        {
            id: 16,
            title: "Pine Forest Retreat",
            location: "Agumbe, Karnataka",
            price: "₹1,250",
            rating: 4.8,
            category: "Forest",
            image: "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Serene retreat in Agumbe's pine forests, known as the 'Cherrapunji of the South'. Perfect for monsoon experiences and rainforest exploration.",
            amenities: ["🌧️ Monsoon Experience", "🌲 Pine Forest", "🐍 King Cobra Research", "📶 WiFi", "🍽️ Kitchen", "🚗 Parking", "🌿 Medicinal Plants", "📚 Research Library"],
            gallery: ["https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Dr. Sunita Rao", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b189?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2020", rating: 4.7 },
            rules: ["Check-in: 2:00 PM - 6:00 PM", "Check-out: 11:00 AM", "No smoking", "Research station guidelines"],
            nearbyPlaces: ["Agumbe Rainforest Research Station - 1 km", "Sunset Point - 2 km", "Jogigundi Falls - 5 km", "Shimoga - 55 km"]
        }
    ];

    const propertyId = parseInt(id || '');
    let property = properties.find(p => p.id === propertyId);

    // Fallback: if property not found, use first property or create a basic one
    if (!property) {
        console.warn('Property not found for ID:', propertyId, 'Available IDs:', properties.map(p => p.id));
        // Use first property as fallback
        property = properties[0] || {
            id: propertyId,
            title: "Property Details",
            location: "Location not available",
            price: "₹0",
            rating: 4.5,
            category: "General",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
            description: "Property details are being loaded...",
            amenities: ["Basic amenities"],
            gallery: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"],
            host: { name: "Host", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80", joinDate: "2020", rating: 4.5 },
            rules: ["Standard rules apply"],
            nearbyPlaces: ["Nearby attractions"]
        };
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Booking functions
    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    const calculatePrices = () => {
        const pricePerUnit = parseInt(property.price.replace('₹', '').replace(',', ''));
        const subtotal = pricePerUnit * quantity;
        const taxes = 59;
        const total = subtotal + taxes;

        return { pricePerUnit, subtotal, taxes, total };
    };

    const handleConfirmBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsLoading(true);

        try {
            const { pricePerUnit, subtotal, taxes, total } = calculatePrices();

            const bookingPayload = {
                propertyId: property.id,
                propertyTitle: property.title,
                propertyLocation: property.location,
                propertyImage: property.image,
                quantity,
                selectedDate,
                selectedTime,
                pricePerUnit,
                subtotal,
                taxes,
                totalAmount: total
            };

            const token = localStorage.getItem('token');

            if (!token) {
                alert('Please log in to make a booking');
                navigate('/login');
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/bookings/create`,
                bookingPayload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setBookingData(response.data.booking);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to create booking. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setBookingData(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className={`${showModal ? 'blur-md filter' : ''} transition-all duration-75`}>
                <Header user={user} onLogout={handleLogout} />

                <div className="max-w-4xl mx-auto px-3 py-4">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 mb-3 text-xs"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back</span>
                    </button>

                    {/* Property Header */}
                    <div className="mb-4">
                        <h1 className="text-lg font-bold text-gray-900 mb-1">{property.title}</h1>
                        <div className="flex items-center space-x-3 text-xs text-gray-600">
                            <span className="flex items-center">
                                <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {property.location}
                            </span>
                            <span className="flex items-center">
                                <svg className="w-3 h-3 mr-0.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {property.rating} rating
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full text-xs font-medium">
                                {property.category}
                            </span>
                        </div>
                    </div>

                    {/* Image and booking side-by-side on large screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Left: Image + details */}
                        <div>
                            <div className='flex'>
                                <div className="mb-4 ">
                                    <img
                                        src={property?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'}
                                        alt={property?.title || 'Property'}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                        onError={(e) => {
                                            console.log('PropertyDetails image error:', property?.image);
                                            const target = e.target as HTMLImageElement;
                                            target.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                                        }}
                                    />
                                </div>
                                <div className="flex items-start w-90">
                                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3 w-full lg:w-64 sticky top-4">
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-xs">Starts at</span>
                                                <span className="font-semibold text-sm">{property.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-xs">Quantity</span>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleQuantityChange(-1)}
                                                        disabled={quantity <= 1}
                                                        className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="font-medium text-xs">{quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(1)}
                                                        disabled={quantity >= 10}
                                                        className="w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-xs">Subtotal</span>
                                                <span className="font-medium text-xs">₹{calculatePrices().subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-xs">Taxes</span>
                                                <span className="font-medium text-xs">₹{calculatePrices().taxes}</span>
                                            </div>
                                            <hr className="border-gray-200" />
                                            <div className="flex justify-between items-center font-semibold text-sm">
                                                <span>Total</span>
                                                <span>₹{calculatePrices().total.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleConfirmBooking}
                                            disabled={isLoading}
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-2 px-3 rounded-md transition-colors shadow-sm hover:shadow-md text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? 'Booking...' : 'Confirm Booking'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Property Title & Description */}
                            <div className="mb-4 w-90">
                                <div className="flex items-center mb-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-sm font-bold text-gray-900">{property.title}</h2>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Choose Date */}
                            <div className="mb-4 w-150">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Choose date</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26'].map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${selectedDate === date
                                                ? 'bg-yellow-500 text-gray-800'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {date}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Choose Time */}
                            <div className="mb-4 w-150">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">Choose time</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                                    {[
                                        { time: '07:00 am', available: 4 },
                                        { time: '09:00 am', available: 2 },
                                        { time: '11:00 am', available: 5 },
                                        { time: '01:00 pm', available: 0 }
                                    ].map(({ time, available }) => (
                                        <button
                                            key={time}
                                            onClick={() => available > 0 && setSelectedTime(time)}
                                            disabled={available === 0}
                                            className={`border px-2 py-2 rounded-md text-left transition-colors ${selectedTime === time
                                                ? 'border-yellow-500 bg-yellow-50'
                                                : available === 0
                                                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                                                    : 'border-gray-300 hover:border-yellow-500 hover:bg-yellow-50'
                                                }`}
                                        >
                                            <div className="text-xs font-medium">{time}</div>
                                            <div className={`text-[10px] ${available === 0 ? 'text-gray-500' : 'text-red-500'}`}>
                                                {available === 0 ? 'Sold out' : `${available} left`}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-500">All times are in IST (GMT +5:30)</p>
                            </div>

                            {/* About */}
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
                                <div className="bg-gray-50 p-2 rounded-md">
                                    <p className="text-xs text-gray-600">Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Booking card */}

                    </div>
                </div>

                <Footer />
            </div>

            {/* Celebration Modal */}
            {showModal && bookingData && (
                <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-xs w-full mx-4 p-3 text-center border">
                        {/* Success Icon */}
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>

                        {/* Celebration Text */}
                        <h2 className="text-base font-bold text-gray-900 mb-1">🎉 Booked! 🎉</h2>
                        <p className="text-gray-600 mb-3 text-xs">Booking confirmed successfully!</p>

                        {/* Booking Details */}
                        <div className="bg-gray-50 rounded-md p-2 mb-3 text-left">
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs">Booking Details:</h3>
                            <div className="space-y-0.5 text-[10px]">
                                <p><span className="font-medium">Ticket:</span> {bookingData.ticketNumber}</p>
                                <p><span className="font-medium">Date:</span> {bookingData.selectedDate}</p>
                                <p><span className="font-medium">Time:</span> {bookingData.selectedTime}</p>
                                <p><span className="font-medium">Qty:</span> {bookingData.quantity}</p>
                                <p><span className="font-medium">Total:</span> ₹{bookingData.totalAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-1">
                            <button
                                onClick={closeModal}
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium py-1.5 px-3 rounded-md transition-colors text-xs"
                            >
                                Continue
                            </button>
                            <button
                                onClick={() => {
                                    closeModal();
                                    navigate('/my-bookings'); // Navigate to My Bookings
                                }}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-md transition-colors text-[10px]"
                            >
                                My Bookings
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyDetails;
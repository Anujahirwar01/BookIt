import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/login";
import Home from "../components/Home";
import PropertyDetails from "../components/PropertyDetails";
import MyBookings from "../components/MyBookings";
import { useAuth } from "../contexts/AuthContext";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return user ? children : <Navigate to="/login" />;
};


const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return user ? <Navigate to="/" /> : children;
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                } />
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/" element={<Home />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/my-bookings" element={
                    <ProtectedRoute>
                        <MyBookings />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;
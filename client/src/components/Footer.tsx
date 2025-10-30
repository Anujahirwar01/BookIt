const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Company Info */}
                <div>
                <div className="text-lg font-bold text-yellow-400 mb-2">BookIt</div>
                <p className="text-sm text-gray-300 mb-3">
                    Your trusted partner for finding the perfect accommodation worldwide.
                </p>
                <div className="flex space-x-3">
                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm">
                    <span className="sr-only">Facebook</span>
                    📘
                    </a>
                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm">
                    <span className="sr-only">Twitter</span>
                    🐦
                    </a>
                    <a href="#" className="text-gray-400 hover:text-yellow-400 transition text-sm">
                    <span className="sr-only">Instagram</span>
                    📷
                    </a>
                </div>
                </div>

                {/* Quick Links */}
                <div>
                <h3 className="text-sm font-medium mb-3">Quick Links</h3>
                <ul className="space-y-1">
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Home</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Properties</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Bookings</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Support</a></li>
                </ul>
                </div>

                {/* Support */}
                <div>
                <h3 className="text-sm font-medium mb-3">Support</h3>
                <ul className="space-y-1">
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Help Center</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Contact Us</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Privacy Policy</a></li>
                    <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Terms of Service</a></li>
                </ul>
                </div>

                {/* Contact */}
                <div>
                <h3 className="text-sm font-medium mb-3">Contact Info</h3>
                <div className="space-y-1 text-sm text-gray-300">
                    <p>📞 +1 (555) 123-4567</p>
                    <p>✉️ support@bookit.com</p>
                    <p>📍 123 Travel Street<br />Adventure City, AC 12345</p>
                </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-4 pt-4 text-center">
                <p className="text-xs text-gray-400">
                © 2025 BookIt. All rights reserved.
                </p>
            </div>
            </div>
        </footer>
    );
};

export default Footer;
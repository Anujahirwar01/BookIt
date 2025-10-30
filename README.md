# 🏨 BookIt - Property Booking System

A full-stack web application for booking travel properties, built with React (frontend) and Node.js (backend). Users can browse properties, make bookings with real-time price calculations, and manage their booking history.

![BookIt Banner](https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80)

## ✨ Features

### 🏠 Property Management
- **Browse Properties** - View featured properties with detailed information
- **Real-time Search** - Filter properties by location, type, and price as you type
- **Property Details** - Comprehensive property pages with images and amenities
- **Price Calculator** - Dynamic pricing based on quantity and dates

### 👤 User Experience
- **Guest Access** - Browse properties without registration
- **User Authentication** - Secure JWT-based login/registration system
- **Responsive Design** - Mobile-first design that works on all devices
- **Modern UI** - Clean interface with Tailwind CSS styling

### 📋 Booking System
- **Quantity Control** - Adjust booking quantity with real-time price updates
- **Date & Time Selection** - Choose preferred booking dates and times
- **Instant Confirmation** - Immediate booking confirmation with ticket numbers
- **Celebration Modal** - Success animation with booking details
- **Price Breakdown** - Detailed cost calculation with taxes and subtotals

### 📊 Booking Management
- **My Bookings** - Personal dashboard for viewing booking history
- **Booking Status** - Track confirmed, cancelled, and completed bookings
- **Cancel Bookings** - Easy cancellation for confirmed bookings
- **Ticket Numbers** - Unique identifiers for all bookings

## 🛠️ Technology Stack

### Frontend (Client)
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing

### Backend (Server)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
BookIt/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── routes/        # Route configuration
│   │   └── services/      # API services
│   ├── .env               # Frontend environment variables
│   └── package.json       # Frontend dependencies
├── server/                 # Node.js Backend
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── db/              # Database connection
│   ├── .env             # Backend environment variables
│   └── package.json     # Backend dependencies
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** (Local or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/bookit.git
   cd bookit
   ```

2. **Setup Backend:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup Frontend (in new terminal):**
   ```bash
   cd client
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Access the application:**
   - **Frontend:** http://localhost:5174
   - **Backend API:** http://localhost:3000

## ⚙️ Environment Configuration

### Backend (.env)
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/bookit
JWT_SECRET=your_strong_jwt_secret
FRONTEND_URL=http://localhost:5174
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development
```

## 🔧 Development

### Start Development Servers
```bash
# Backend (Terminal 1)
cd server && npm run dev

# Frontend (Terminal 2) 
cd client && npm run dev
```

### Build for Production
```bash
# Backend
cd server && npm start

# Frontend
cd client && npm run build
```

## 📚 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |

### Booking Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings/my-bookings` | Get user's bookings |
| POST | `/api/bookings/create` | Create new booking |
| PATCH | `/api/bookings/cancel/:ticketNumber` | Cancel booking |

### Request/Response Examples

**Create Booking:**
```json
POST /api/bookings/create
{
  "propertyId": 1,
  "quantity": 2,
  "selectedDate": "2024-12-25",
  "selectedTime": "10:00 AM",
  "pricePerUnit": 5000,
  "subtotal": 10000,
  "taxes": 1800,
  "totalAmount": 11800
}
```

## 🎨 UI Components

### Key Components
- **Header** - Navigation with search and user menu
- **PropertyDetails** - Booking interface with price calculator
- **MyBookings** - Booking history with grid layout
- **FeaturedSection** - Property listing with search filters
- **AuthContext** - Global authentication state management

### Design Features
- **Real-time Search** - Instant filtering as you type
- **Responsive Grid** - 2-column booking layout on desktop
- **Modal System** - Celebration modals with blur effects
- **Loading States** - Smooth loading animations
- **Error Handling** - User-friendly error messages

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt for secure password storage
- **CORS Protection** - Environment-specific origin control
- **Input Validation** - Server-side request validation
- **Protected Routes** - Authentication-required endpoints

## 🌍 Deployment

### Production Environment Setup

1. **Backend Deployment:**
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookit
   JWT_SECRET=your_production_jwt_secret
   FRONTEND_URL=https://yourdomain.com
   NODE_ENV=production
   ```

2. **Frontend Deployment:**
   ```env
   VITE_API_URL=https://api.yourdomain.com
   VITE_NODE_ENV=production
   ```

### Deployment Platforms
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Railway, Render, DigitalOcean, AWS
- **Database:** MongoDB Atlas (recommended)

## 🧪 Testing

Run tests (when implemented):
```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

## 📝 Development Notes

### Key Features Implemented
- ✅ Full-stack booking system with real-time calculations
- ✅ JWT authentication with dual token format support
- ✅ Responsive UI with Tailwind CSS
- ✅ MongoDB integration with Mongoose
- ✅ Environment-based configuration
- ✅ CORS security configuration
- ✅ Real-time search and filtering
- ✅ Celebration modals and user feedback
- ✅ Booking history management

### Future Enhancements
- 🔄 Payment gateway integration (Stripe/PayPal)
- 🔄 Email notifications for bookings
- 🔄 Property owner dashboard
- 🔄 Reviews and ratings system
- 🔄 Advanced search filters
- 🔄 Booking calendar view
- 🔄 Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **MongoDB** - For the flexible NoSQL database
- **Vite** - For the lightning-fast build tool

---

**Made with ❤️ for travelers and property owners worldwide**
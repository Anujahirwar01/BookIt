# BookIt Server - Node.js Backend API

This is the backend API server for the BookIt booking system built with Node.js, Express, and MongoDB.

## Environment Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables in `.env`:**
   ```env
   PORT=3000                                    # Server port
   MONGO_URI=mongodb://127.0.0.1:27017/bookit # Database connection
   JWT_SECRET=your_jwt_secret_key              # JWT signing secret
   FRONTEND_URL=http://localhost:5174          # Frontend URL for CORS
   NODE_ENV=development                        # Environment type
   ```

3. **For production, update the configuration:**
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookit
   JWT_SECRET=your_strong_production_jwt_secret
   FRONTEND_URL=https://your-frontend-domain.com
   NODE_ENV=production
   ```

## Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | 3000 | Yes |
| `MONGO_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5174 | Yes |
| `NODE_ENV` | Environment type | development | No |

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/bookings/my-bookings` - Get user bookings
- `POST /api/bookings/create` - Create new booking
- `PATCH /api/bookings/cancel/:ticketNumber` - Cancel booking

## CORS Configuration

The server uses the `FRONTEND_URL` environment variable to configure CORS. This ensures only your frontend domain can access the API, improving security.

For development: `http://localhost:5174`
For production: `https://your-frontend-domain.com`
# DMS Backend API

Backend API for Disaster Management System built with Node.js, Express, and MongoDB.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
The `.env` file is already configured with your MongoDB Atlas connection.

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "victim",
  "phone": "+92 300 1234567",
  "region": "Islamabad"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <your-jwt-token>
```

## User Roles
- `admin` - System administrator
- `ngo` - NGO organization
- `volunteer` - Volunteer user
- `victim` - Disaster victim

## Testing the API

### Using Thunder Client / Postman

1. **Test Signup:**
   - POST `http://localhost:5000/api/auth/signup`
   - Body: JSON with user details
   - Should return token and user data

2. **Test Login:**
   - POST `http://localhost:5000/api/auth/login`
   - Body: email and password
   - Should return token and user data

3. **Test Protected Route:**
   - GET `http://localhost:5000/api/auth/me`
   - Header: `Authorization: Bearer <token>`
   - Should return current user data

## Database
- **Provider:** MongoDB Atlas
- **Database Name:** dms
- **Collections:** users

## Security Features
- Password hashing with bcrypt
- JWT authentication
- CORS protection
- Input validation
- Protected routes

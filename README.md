# API Practice - Full Stack Authentication & CRUD

A full-stack application demonstrating secure authentication, role-based access, and CRUD operations.

## Features

### Backend
- **Authentication**: User registration & login with JWT tokens and password hashing (bcrypt)
- **Role-Based Access**: User and admin roles with protected endpoints
- **CRUD API**: Create, read, update, delete notes/memos
- **API Documentation**: Swagger/OpenAPI integration
- **Validation & Error Handling**: Input sanitization and structured error responses
- **Database**: PostgreSQL/MongoDB schema with Drizzle ORM

### Security & Performance
- Secure JWT token handling
- Input validation & sanitization
- CORS enabled
- Rate limiting middleware
- Redis caching support
- Docker deployment ready

### Frontend
- React/Next.js UI (minimal setup)
- User registration & login forms
- Protected dashboard (JWT required)
- CRUD interface for notes management
- Error/success message handling

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL/MongoDB, Drizzle ORM
- **Auth**: JWT, bcrypt
- **Frontend**: React/Next.js
- **Caching**: Redis (optional)
- **Documentation**: Swagger/Postman

## Getting Started

### Backend
```bash
npm install
npm start
# API runs on http://localhost:3000
# Swagger docs: http://localhost:3000/api-docs
```

### Environment Variables
```
DB_URL=your_database_url
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url (optional)
```

## API Endpoints
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /memos` - List memos (authenticated)
- `POST /memos` - Create memo (authenticated)
- `PUT /memos/:id` - Update memo
- `DELETE /memos/:id` - Delete memo
- Admin endpoints require admin role

## Project Structure
```
├── routes/        # API endpoints
├── models/        # Database schemas
├── middleware/    # Auth, rate limiting, validation
├── config/        # DB, Redis, Swagger config
├── utils/         # Helpers (mailer, validators)
└── app.js         # Express app
```

## Deployment
Dockerized setup included. Build and run with:
```bash
docker build -t api-app .
docker run -p 3000:3000 api-app
```


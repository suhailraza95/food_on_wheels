# Food On Wheels API

A Node.js + Express + MongoDB backend for a Food On Wheels platform where customers can discover nearby vendors, vendors can go online/offline, and users can authenticate using Email OTP verification.

---

## Features

### Authentication

* User Signup
* Email OTP Verification
* Login with JWT Access Token
* Refresh Token Support
* Logout
* Protected Routes

### Vendor Management

* Create Vendor Profile
* Vendor Go Online
* Vendor Go Offline
* Vendor Details

### Customer Management

* Create Customer Profile
* Customer Dashboard
* Nearby Vendor Discovery

### Reviews

* Customer Reviews for Vendors

### Password Management

* Forgot Password
* Reset Password using OTP

### Security

* JWT Authentication
* Refresh Tokens
* API Key Protection
* Password Hashing with bcrypt
* Email Verification
* Environment Variables

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* JWT
* Refresh Tokens
* OTP Verification

## Validation

* AJV
* AJV Formats

## Email Service

* Nodemailer

## Documentation

* Swagger UI
* OpenAPI
* Postman Collection

---

# Project Structure

```bash
food-on-wheels/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── docs/
│   └── openapi.yaml
├── utils/
├── app.js
├── server.js
├── .env
└── package.json
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
APP_ENV=development
PORT=5004

MONGO_URL=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_JWT_SECRET
JWT_REFRESH_SECRET=YOUR_REFRESH_SECRET

API_KEY=YOUR_API_KEY

EMAIL_USER=YOUR_EMAIL
EMAIL_PASS=YOUR_APP_PASSWORD
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/food-on-wheels.git

cd food-on-wheels
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

or

```bash
npm start
```

Server will run on:

```bash
http://localhost:5004
```

---

# Authentication Flow

## Signup

```http
POST /api/auth/signup
```

User registers using email and password.

System sends OTP to registered email.

---

## Verify OTP

```http
POST /api/otp/verify
```

User verifies email account.

---

## Login

```http
POST /api/auth/login
```

Returns:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## Refresh Token

```http
POST /api/auth/refresh-token
```

Generates a new access token.

---

## Logout

```http
POST /api/auth/logout
```

Invalidates refresh token.

---

# Vendor APIs

## Create Vendor Profile

```http
POST /api/vendor/profile
```

### Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "businessName": "Food Truck",
  "city": "Jagdalpur",
  "state": "Chhattisgarh",
  "category": "Food Truck"
}
```

---

## Vendor Go Online

```http
POST /api/vendor/go-online
```

### Request Body

```json
{
  "vendorId": "vendor_id",
  "latitude": 19.0760,
  "longitude": 72.8777,
  "openTime": "09:00",
  "closeTime": "22:00",
  "status": "online"
}
```

---

## Vendor Details

```http
GET /api/vendor/:vendorId
```

---

# Customer APIs

## Create Customer Profile

```http
POST /api/customer/profile
```

---

## Customer Dashboard

```http
GET /api/customer/dashboard/:customerId
```

Returns nearby vendors and related information.

---

# Password APIs

## Forgot Password

```http
POST /api/password/forgot-password
```

### Request

```json
{
  "email": "user@example.com"
}
```

---

## Reset Password

```http
POST /api/password/reset-password
```

### Request

```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewPassword@123"
}
```

---

# API Security

Every request must include:

```http
x-api-key: YOUR_API_KEY
```

Protected endpoints also require:

```http
Authorization: Bearer ACCESS_TOKEN
```

---

# API Documentation

Swagger UI:

```http
http://localhost:5004/api-docs
```

Redoc:

```http
http://localhost:5004/redoc
```

---

# Postman Collection

Import the provided Postman Collection and update:

* API Key
* Access Token
* Refresh Token
* User IDs
* Vendor IDs

before testing endpoints.

---

# Future Enhancements

* Vendor Ratings
* Real-Time Vendor Tracking
* Google Maps Integration
* Push Notifications
* Order Management
* Payment Gateway Integration
* Vendor Analytics Dashboard

---

# Author

**Sheikh Suhail Raza**

Backend Developer | DevOps Enthusiast

Built using Node.js, Express, MongoDB, JWT Authentication, and Email OTP Verification.

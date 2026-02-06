# Candidate Referral Management System

A production-ready MERN stack application for managing candidate referrals.

## Features

- **Recruiter Authentication**: Secure login for recruiters using JWT.
- **Candidate Referral**: Submit referrals with PDF resume uploads (stored in AWS S3).
- **Dashboard**: View, filter, and manage candidate statuses.
- **Responsive Design**: Works on desktop and mobile.

## Tech Stack

- **Frontend**: React.js, Context API, CSS Grid/Flexbox.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Storage**: AWS S3.
- **Authentication**: JWT, bcryptjs.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- MongoDB instance running.
- AWS S3 bucket created.

### Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Open `.env` and fill in your MongoDB URI, JWT Secret, and AWS Credentials.

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

## Folder Structure

```
/root
├── /backend
│   ├── /config (DB Connection)
│   ├── /controllers (Logic)
│   ├── /middleware (Auth & Uploads)
│   ├── /models (Schemas)
│   ├── /routes (API Endpoints)
│   └── server.js
├── /frontend
│   ├── /src
│   │   ├── /components (UI Components)
│   │   ├── /context (State Management)
│   │   ├── /pages (Views)
│   │   ├── /styles (CSS)
│   │   └── App.js
└── README.md
```

## API Endpoints

- `POST /api/auth/login`: Login user. (Check `backend/.env` for PORT, default 5001)
- `POST /api/candidates`: Create a referral (Upload PDF).
- `GET /api/candidates`: Get all candidates.
- `PUT /api/candidates/:id/status`: Update candidate status.

## Deployment
See [Deployment Guide](deployment_guide.md)

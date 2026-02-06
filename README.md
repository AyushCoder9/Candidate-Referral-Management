# Candidate Referral Management System

A full-stack application for managing candidate referrals, built with the MERN stack (MongoDB, Express, React, Node.js) and AWS S3 for resume storage.

## a. Features Implemented

- **Authentication**: Secure recruiter login (JWT-based). _Registration is handled internally via API._
- **Referral Management**: Add, view, and delete candidate referrals.
- **Resume Handling**: Securely upload and store resumes on AWS S3 with Pre-signed URL access.
- **Dashboard**: Filter candidates by job title or status (Pending, Reviewed, Hired, Rejected).
- **Security**: Protected API routes and secure file access.
- **Responsive Design**: Fully responsive UI for desktop and mobile.

## b. Steps to Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- AWS Account (with S3 bucket and IAM credentials)

### 1. Clone the Repository

```bash
git clone https://github.com/AyushCoder9/Candidate-Referral-Management.git
cd Candidate-Referral-Management
```

### 2. Backend Setup

Navigate to the `backend` directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name
FRONTEND_URL=http://localhost:3000
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5001
```

Start the React application:

```bash
npm start
```

The app will run at `http://localhost:3000`.

## c. Assumptions and Limitations

1.  **Render Cold Start**: The backend is hosted on Render's free tier. **Please wait 1-2 minutes for the initial request to process**, as the service spins down after inactivity. if the login fails initially, simply try again after a minute.
2.  **Login Credentials**: Use the mock credentials displayed on the Login page to access the system (Username: `admin`, Password: `password123`).
3.  **Resume Format**: Only PDF files are supported for resume uploads.
4.  **AWS S3**: The application assumes valid AWS credentials are provided. If running locally without AWS keys, upload functionality will fail.
5.  **Single User Role**: Currently, the system supports a single 'Recruiter' role. Multi-tenant or Admin/User role separation is a future enhancement.

## d. API Reference

- `POST /api/auth/login`: Login user. (Default PORT: 5001)
- `POST /api/auth/register`: Create new user (**Internal/Admin tool only, no UI**).
- `GET /api/candidates`: Fetch all candidates.
- `POST /api/candidates`: Create a referral.

## Tech Stack

- **Frontend**: React.js, Context API, CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Storage**: AWS S3.

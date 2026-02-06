# Candidate Referral Management System

A full-stack application for managing candidate referrals, built with the MERN stack (MongoDB, Express, React, Node.js) and AWS S3 for resume storage.

## Features

- **Authentication**: Secure recruiter login/registration (JWT-based).
- **Referral Management**: Add, view, and delete candidate referrals.
- **Resume Handling**: Securely upload and store resumes on AWS S3 with Pre-signed URL access.
- **Dashboard**: Filter candidates by job title or status (Pending, Reviewed, Hired, Rejected).
- **Security**: Protected API routes and secure file access.

## Technology Stack

### Backend

- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing user and candidate data.
- **Mongoose**: ODM for MongoDB.
- **AWS SDK**: For S3 file storage interactions.
- **JSON Web Token (JWT)**: For secure authentication.

### Frontend

- **React**: UI library.
- **React Router**: For client-side routing.
- **Axios**: For HTTP requests.
- **CSS3**: Custom styling.

## Prerequisites

Before running the application locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- AWS Account (with S3 bucket and IAM credentials)

## Environment Configuration

Create a `.env` file in the `backend` directory with the following variables:

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

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5001
```

## Installation & Running Locally

1.  **Clone the repository**

    ```bash
    git clone https://github.com/AyushCoder9/Candidate-Referral-Management.git
    cd Candidate-Referral-Management
    ```

2.  **Install Dependencies**

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

3.  **Start the Application**
    Open two terminals:

    Terminal 1 (Backend):

    ```bash
    cd backend
    npm run dev
    ```

    Terminal 2 (Frontend):

    ```bash
    cd frontend
    npm start
    ```

## Deployment

### Backend (Render)

The backend is configured to be deployed on [Render](https://render.com/). Ensure you set the environment variables in your Render dashboard matching your local `.env`.

### Frontend (Vercel)

The frontend is configured for deployment on [Vercel](https://vercel.com/). Add the `REACT_APP_API_URL` environment variable in your Vercel project settings pointing to your deployed backend URL.

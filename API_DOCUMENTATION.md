# API Documentation

**Candidate Referral Management System**

**Base URL**:

- Local: `http://localhost:5001`
- Production: `https://your-backend-url.onrender.com`

---

## **1. Authentication**

### **Login**

Authenticate a user and receive a JWT token.

- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body** (`application/json`):
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Success Response** (`200 OK`):
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "username": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Response** (`401 Unauthorized`):
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

### **Register**

Register a new recruiter/admin.

- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body** (`application/json`):
  ```json
  {
    "username": "newrecruiter",
    "password": "securepassword"
  }
  ```
- **Success Response** (`201 Created`):
  ```json
  {
    "_id": "60d0fe4f5311236168a109cb",
    "username": "newrecruiter",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

## **2. Candidates**

**Note**: All Candidate endpoints require the `Authorization` header.

- **Header**: `Authorization: Bearer <your_jwt_token>`

### **Get All Candidates**

Retrieve a list of all referred candidates.

- **Endpoint**: `GET /api/candidates`
- **Access**: Private
- **Success Response** (`200 OK`):
  ```json
  [
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "jobTitle": "Frontend Developer",
      "status": "Pending",
      "resumeUrl": "https://s3-bucket-url...",
      "createdAt": "2021-06-22T10:00:00.000Z"
    }
  ]
  ```

### **Create Referral**

Submit a new candidate referral with a resume.

- **Endpoint**: `POST /api/candidates`
- **Access**: Private
- **Content-Type**: `multipart/form-data`
- **Request Body** (Form Data):
  - `name`: (Text) Candidate Name
  - `email`: (Text) Candidate Email
  - `phone`: (Text) Candidate Phone
  - `jobTitle`: (Text) Job Title (e.g., "Developer")
  - `resume`: (File) PDF file upload
- **Success Response** (`201 Created`):
  ```json
  {
    "message": "Candidate added successfully"
  }
  ```
- **Error Response** (`400 Bad Request`):
  ```json
  {
    "message": "Candidate already exists"
  }
  // OR
  {
    "message": "Please upload a resume (PDF)"
  }
  ```

### **Update Candidate Status**

Update the hiring status of a candidate.

- **Endpoint**: `PUT /api/candidates/:id/status`
- **Access**: Private
- **Request Body** (`application/json`):
  ```json
  {
    "status": "Hired"
  }
  ```
  _Valid Statuses_: `Pending`, `Reviewed`, `Hired`, `Rejected`
- **Success Response** (`200 OK`):
  ```json
  {
    "_id": "60d21b4667d0d8992e610c85",
    "status": "Hired",
    ...
  }
  ```

### **Delete Candidate**

Remove a candidate and their resume from the system.

- **Endpoint**: `DELETE /api/candidates/:id`
- **Access**: Private
- **Success Response** (`200 OK`):
  ```json
  {
    "message": "Candidate removed"
  }
  ```

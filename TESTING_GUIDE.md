# Testing Guide & Deliverables

## 1. Test Points

### A. Development Environment (Local)

**Goal**: Verify logic, error handling, and component integration.

- **Authentication Flow**:
  - [ ] **Registration**: Register a new user (`POST /api/auth/register`). Verify user is created in local MongoDB Compass.
  - [ ] **Login (Success)**: Login with valid credentials. Verify JWT token is received.
  - [ ] **Login (Failure)**: Try incorrect password. Verify `401 Unauthorized` error.
  - [ ] **Token Persistence**: Refresh page. Verify user remains logged in (if persisted in localStorage/Context).

- **Candidate Management**:
  - [ ] **Create Referral (Text only)**: Attempt to submit form without a resume. Verify "Please upload a resume" error.
  - [ ] **Create Referral (Success)**: Submit form with all fields + PDF resume. Verify `201 Created` and success message.
  - [ ] **S3 Upload (Local)**: Verify the file actually appears in your S3 bucket console.
  - [ ] **Duplicate Email**: Try to refer a candidate with an existing email. Verify "Candidate already exists" error.

- **Dashboard & Display**:
  - [ ] **List View**: Verify all created candidates appear on the Dashboard.
  - [ ] **Resume Link**: Click "View Resume". Verify it opens the Pre-signed URL (PDF view).
  - [ ] **Filtering**:
    - Filter by Status (e.g., "Pending"). Verify list updates.
    - Filter by Job Title. Verify correct matching.

- **Status Updates**:
  - [ ] **Change Status**: Change a candidate's status to "Hired". Verify it updates immediately on UI.
  - [ ] **Refresh**: Refresh page. Verify the new status persists.

- **Deletion**:
  - [ ] **Delete Flow**: Click Delete -> Confirm Access. Verify candidate is removed from UI.
  - [ ] **Database Check**: Verify document is gone from MongoDB.
  - [ ] **S3 Check**: Verify the resume file is deleted from the S3 bucket.

### B. Production Environment (Deployed)

**Goal**: Verify connectivity, security, permissions, and performance.

- **Connectivity**:
  - [ ] **Frontend Load**: Open Vercel URL. Verify page loads quickly without console errors.
  - [ ] **Backend Health**: Verify Frontend can talk to Backend (Render may have a "Cold Start" delay of 1-2 mins on first request).

- **Cross-Origin Resource Sharing (CORS)**:
  - [ ] **Access Control**: Verify API requests from Vercel domain succeed.
  - [ ] **Restrictions**: (Optional) Try to call the API from a different domain (e.g., local Postman) to see if it's restricted (if `FRONTEND_URL` is strictly enforced).

- **Production Data**:
  - [ ] **Real Upload**: Upload a real PDF resume. Verify it downloads/opens correctly via the production S3 link.
  - [ ] **Data Persistence**: Add a candidate, wait 10 mins (let server sleep), refresh. Verify data is still there (MongoDB Atlas connection).

- **Security**:
  - [ ] **HTTPS**: Verify the site is served over HTTPS (auto-handled by Vercel/Render).
  - [ ] **Token Expiry**: (Long term) Verify session expires after 30 days as configured.

---

## 2. API Documentation

**Base URL**: `https://candidate-referral-backend.onrender.com` (Production) or `http://localhost:5001` (Local)

### Authentication

#### 1. Login

- **Endpoint**: `POST /api/auth/login`
- **Body**:
  ```json
  {
    "username": "admin",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "_id": "...",
    "username": "admin",
    "token": "eyJhbG..."
  }
  ```

#### 2. Register (Optional/Admin)

- **Endpoint**: `POST /api/auth/register`
- **Body**: same as login.

### Candidates

#### 3. Create Candidate

- **Endpoint**: `POST /api/candidates`
- **Headers**: `Content-Type: multipart/form-data`
- **Body (Form Data)**:
  - `name`: "John Doe"
  - `email`: "john@example.com"
  - `phone`: "1234567890"
  - `jobTitle`: "Senior Developer"
  - `resume`: [Select PDF File]
- **Response**: `201 Created`

#### 4. Get All Candidates

- **Endpoint**: `GET /api/candidates`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Response**: `200 OK` (Array of candidate objects with `resumeUrl`)

#### 5. Update Status

- **Endpoint**: `PUT /api/candidates/:id/status`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Body**:
  ```json
  {
    "status": "Hired"
  }
  ```

#### 6. Delete Candidate

- **Endpoint**: `DELETE /api/candidates/:id`
- **Headers**: `Authorization: Bearer <your_jwt_token>`
- **Response**: `200 OK` `{ "message": "Candidate removed" }`

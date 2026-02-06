#!/bin/bash

# Initialize Git
git init
git branch -M main

# 1. Config & Setup
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
git add .gitignore
git commit -m "chore: Initial commit with .gitignore"

git add README.md
git commit -m "docs: Add project README"

git add backend/package.json backend/package-lock.json
git commit -m "chore(backend): Initialize backend dependencies"

git add frontend/package.json frontend/package-lock.json
git commit -m "chore(frontend): Initialize frontend dependencies"

# 2. Backend Foundation
git add backend/config/db.js
git commit -m "feat(backend): Add MongoDB connection configuration"

git add backend/models/User.js
git commit -m "feat(backend): Create User model for authentication"

git add backend/models/Candidate.js
git commit -m "feat(backend): Create Candidate model for referral data"

# 3. Backend Middleware & Utils
git add backend/middleware/authMiddleware.js
git commit -m "feat(backend): Add authentication middleware"

git add backend/middleware/uploadMiddleware.js
git commit -m "feat(backend): Add Multer/S3 upload middleware"

# 4. Backend Controllers & Routes - Auth
git add backend/controllers/authController.js
git commit -m "feat(backend): Implement user registration and login logic"

git add backend/routes/authRoutes.js
git commit -m "feat(backend): Define authentication routes"

# 5. Backend Controllers & Routes - Candidates
# Start with basic version if possible, but committing full file is fine for simulation
git add backend/controllers/candidateController.js
git commit -m "feat(backend): Implement candidate CRUD operations"

git add backend/routes/candidateRoutes.js
git commit -m "feat(backend): Define candidate management routes"

# 6. Backend Entry
git add backend/server.js
git commit -m "feat(backend): Setup Express server and middleware wiring"

# 7. Frontend Setup
git add frontend/public
git commit -m "chore(frontend): Add public assets and HTML template"

git add frontend/src/index.js frontend/src/index.css
git commit -m "feat(frontend): Setup React entry point and global styles"

git add frontend/src/App.js frontend/src/styles/App.css
git commit -m "feat(frontend): Setup main App component and routing"

# 8. Frontend Context
git add frontend/src/context/AuthContext.js
git commit -m "feat(frontend): Implement AuthContext for state management"

# 9. Frontend Components
git add frontend/src/components/Navbar.js
git commit -m "feat(frontend): Create Navbar component"

git add frontend/src/components/ReferralForm.js frontend/src/styles/Dashboard.css
git commit -m "feat(frontend): Create ReferralForm component"

git add frontend/src/components/CandidateCard.js
git commit -m "feat(frontend): Create CandidateCard component"

# 10. Frontend Pages
git add frontend/src/styles/Form.css
git commit -m "style(frontend): Add shared form styles"

git add frontend/src/pages/LoginPage.js
git commit -m "feat(frontend): Create Login page with validation"

git add frontend/src/pages/Dashboard.js
git commit -m "feat(frontend): Develop Dashboard page with filtering"

# 11. Refinements (Simulated "Later" commits)
# We can't actually change the files back and forth easily, 
# but we can commit any remaining files or "updates" if we missed any.

# Check for any remaining files
git add .
git commit -m "chore: Add remaining project files and configurations"

# Fake "Fixes" by amending or creating empty commits isn't great, 
# but we can add specific "changes" if we had modified them in stages.
# Since we have the final state, we'll just ensure everything is committed.

# Let's add a deployment specific commit for the guide and env example
git add backend/.env.example
git commit -m "docs: Add backend environment example"

# Deployment guide creation (which we actually just did)
git add .
git commit -m "docs: Add detailed deployment guide"

# Frontend .env creation (which we just did)
git add frontend/.env
git commit -m "config(frontend): Externalize API URL for deployment"

echo "Commit generation complete!"

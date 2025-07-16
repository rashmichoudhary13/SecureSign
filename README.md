# SecureSign - MERN Authentication System
SecureSign is a full-stack authentication project using the MERN stack (MongoDB, Express, React, Node.js).
# ✨ Features
- Register with email & password
- Login & logout functionality
- Email verification system
- Reset password via OTP
- JWT-based session management
-  Modular project structure
  
# ⚙️ Tech Stack
**Frontend:**  Vite + React, Bootstrap <br>
**Backend:**  Node.js, Express.js <br>
**Database:**  Mongodb (Via mongoose) <br>
**Auth:**  JWT + Bcrypt <br>
**Email Service:**  NodeMailer using Brevo SMTP

# Screenshot

# Usage
1. Install Dependencies
   - cd client <br>
      npm install
   - cd ../server <br>
     npm install
2. Add .env file in both client and server
   - client/.env <br>
     ``` VITE_API_URL=http://localhost:5000 ```
   - server/.env <br>
     ```
     MONGODB_URI=your_mongodb_url
     JWT_SECRET=your_jwt_secret
     NODE_ENV = "development"
     SMTP_USER= your_smtp_user
     SMTP_PASS= your_smtp_pass
     SENDER_EMAIL= sender_email
     ```
  # Run the App Locally
  1. Start the backend
     ``` npm run server ```
  2. Start the frontend
     ``` npm run dev ```

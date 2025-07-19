# SecureSign - MERN Authentication System
SecureSign is a full-stack authentication project using the MERN stack (MongoDB, Express, React, Node.js).
# ✨ Features
- Register with email & password
- Login & logout functionality
- Email verification system
- Reset password via OTP
- JWT-based session management
- Protected Routes
- Role-Based Access Control (RBAC)
-  Modular project structure
  
# ⚙️ Tech Stack
**Frontend:**  Vite + React, React-Bootstrap, react-toastify <br>
**Backend:**  Node.js, Express.js <br>
**Database:**  Mongodb (Via mongoose) <br>
**Auth:**  JWT + Bcrypt <br>
**Email Service:**  NodeMailer using Brevo SMTP

# 📷 Screenshot

- ## Home Page
  
 <img width="1919" height="975" alt="image" src="https://github.com/user-attachments/assets/16aff1fe-2be4-4e66-8fe0-0904b8ae9bb1" />

- ## Login Page
  
  <img width="1913" height="974" alt="image" src="https://github.com/user-attachments/assets/b7de267a-e7a0-40eb-bad5-fd6cf3fac26c" />

- ## Register Page

  <img width="1919" height="970" alt="image" src="https://github.com/user-attachments/assets/bdbfb3c9-8ebf-4017-aa3c-3700b7f9ec85" />

- ## Loggedin Home Page

  <img width="1919" height="969" alt="image" src="https://github.com/user-attachments/assets/301a5386-98e0-4562-bd74-f090e13a2378" />

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


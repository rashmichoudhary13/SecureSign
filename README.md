<<<<<<< HEAD
#SecureSign

<h1> <b> SecureSign <b>  - MERN Authentication System </h1> <br> 
SecureSign is a full-stack authentication project using the MERN stack (MongoDB, Express, React, Node.js).

<h2> ✨ Features </h2>
<li> Register with email & password </li> 
<li> Login & logout functionality </li> 
<li> Email verification system </li>
<li> Reset password via OTP </li>
<li> JWT-based session management </li>
<li> Modular project structure </li>

<h2> ⚙️ Tech Stack </h2>
**Frontend**  Vite + React, Bootstrap
**Backend**
=======
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
**Frontend:**  Vite + React, Bootstrap, react-toastify <br>
**Backend:**  Node.js, Express.js <br>
**Database:**  Mongodb (Via mongoose) <br>
**Auth:**  JWT + Bcrypt <br>
**Email Service:**  NodeMailer using Brevo SMTP

# 📷 Screenshot

- ## Home Page
  
  <img width="1919" height="971" alt="image" src="https://github.com/user-attachments/assets/fa4497b7-a0fd-427d-a586-10c0356a9251" />

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
>>>>>>> 10322bf2863049872e23b69291cd116363856c09

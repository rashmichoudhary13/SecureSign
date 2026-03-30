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
-  responsive pages
  
# ⚙️ Tech Stack
**Frontend:**  Vite + React, React-Bootstrap, react-toastify <br>
**Backend:**  Node.js, Express.js <br>
**Database:**  Mongodb (Via mongoose) <br>
**Auth:**  JWT + Bcrypt <br>
**Email Service:**  NodeMailer using Brevo SMTP

## 🔗 API Routes

Below are the API endpoints used in the SecureSign application.

---

## 🔐 Authentication Routes (`/api/auth`)

| Method | Route              | Protected | Description                     |
| ------ | ------------------ | --------- | ------------------------------- |
| POST   | `/register`        | ❌         | Register a new user             |
| POST   | `/login`           | ❌         | Login user                      |
| POST   | `/logout`          | ✅         | Logout user                     |
| POST   | `/send-verify-otp` | ✅         | Send OTP for email verification |
| POST   | `/verify-account`  | ✅         | Verify user email using OTP     |
| GET    | `/is-auth`         | ✅         | Check if user is authenticated  |
| POST   | `/send-reset-otp`  | ❌         | Send OTP for password reset     |
| POST   | `/reset-password`  | ❌         | Reset user password             |

📌 **Protected routes** require authentication middleware (`userAuth`)

---

## 👤 User Routes (`/api/user`)

| Method | Route      | Role Access             | Description            |
| ------ | ---------- | ----------------------- | ---------------------- |
| GET    | `/data`    | All authenticated users | Get user data          |
| GET    | `/admin`   | Admin only              | Access admin panel     |
| GET    | `/editor`  | Admin, Editor           | Access editor features |
| GET    | `/product` | User, Admin, Editor     | Access product page    |

📌 All UserRoutes are protected.

## 🛡️ Middleware Used

* **`userAuth`** → Verifies if the user is logged in
* **`authorizeRoles(...)`** → Restricts access based on user roles

---

# 📷 Screenshot

- ## Home Page
  
 <img width="1919" height="975" alt="image" src="https://github.com/user-attachments/assets/16aff1fe-2be4-4e66-8fe0-0904b8ae9bb1" />

- ## Login Page
  
  <img width="1913" height="974" alt="image" src="https://github.com/user-attachments/assets/b7de267a-e7a0-40eb-bad5-fd6cf3fac26c" />

- ## Register Page

  <img width="1919" height="972" alt="image" src="https://github.com/user-attachments/assets/87a84ef9-5a16-4369-aea9-ec09935f7920" />

- ## Admin Logged In Page

  <img width="1918" height="969" alt="image" src="https://github.com/user-attachments/assets/f29fe938-4db1-4bf9-a7f1-b0f3af71d267" />

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


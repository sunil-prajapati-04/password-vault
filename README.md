# 🔐 Password Vault

A secure and minimal password manager backend built with **Node.js**, **Express**, and **MongoDB**, allowing users to save and manage multiple passwords under different vaults. 
OTP-based login, JWT-based sessions, and encryption-ready design.

---

## 🚀 Features

- ✅ User authentication with Email, Master Password & OTP
- 🔐 Vault-based password storage
- 📁 Store multiple passwords per vault
- 🛡️ Security-ready structure (encryption + token-based session)
- 📫 Email OTP via NodeMailer (Gmail SMTP)
- 📦 Mongoose models with array of objects for password storage
- 🍪 JWT + Cookies for secure sessions
- 🌐 RESTful API structure (Postman-friendly)

---

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: OTP via Email (NodeMailer) + JWT (jsonwebtoken)
- **Session**: Cookies (`cookie-parser`)
- **Environment**: dotenv
- **Security**:
  - `bcrypt` (password hashing – optional)
  - `cors`, `helmet` (recommended for prod)


## 🧠 Project Structure
password-vault/
│
├── controllers/ # API logic (login, OTP verify, vault ops)
├── models/ # Mongoose schemas (User, Vault)
├── routes/ # Express routes
├── utils/ # OTP, email sending, token utils
├── middlewares/ # JWT auth & cookie handlers
├── .env # Environment variables
├── index.js # Express setup
└── README.md

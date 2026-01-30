ls frontend/dist
# 🚀 ReqHub – API Testing Platform

ReqHub is a full-stack API testing web application inspired by Postman, designed to help developers test, debug, and manage HTTP and WebSocket APIs from a modern, user-friendly interface.

It provides secure authentication, request history, environment variables, and real-time WebSocket communication in a single dashboard.

<img width="2660" height="1276" alt="image" src="https://github.com/user-attachments/assets/12e500d6-9d06-4de5-8e08-940e9961b21c" />

---

## ✨ Features

### 📡 Core API Testing
- **HTTP Methods:** Support for GET, POST, PUT, DELETE, and more.
- **Request Configuration:** Advanced editor for Headers, Query Parameters, and Request Body (JSON).
- **Response Viewer:** JSON response viewer with syntax highlighting and formatting.
- **WebSocket Support:** Real-time WebSocket connection and message sending.

### 🔐 Authentication & Security
- **Multiple Auth Providers:** Email/Password (JWT), Google OAuth, and GitHub OAuth.
- **Token Support:** Built-in Bearer token authentication support for requests.
- **Secure Sessions:** Per-user request isolation and protected routes.
- **CORS Proxy:** Backend proxy to handle CORS issues and secure cookie handling.

### ⚡ Workflow Enhancements
- **Environment Variables:** Support for dynamic variables in requests.
- **History:** Auto-save request history with the ability to "Star" favorites.
- **Tabs System:** Multiple request tabs for a seamless, Postman-like experience.

---

## 🛠 Tech Stack

### **Frontend**
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS, Framer Motion
- **State Management:** Zustand
- **Routing:** React Router
- **HTTP Client:** Axios

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Real-time:** WebSockets (`ws` library)
- **Auth:** JWT, Passport.js (Google & GitHub OAuth)

### **Deployment**
- **Platform:** Render (Frontend & Backend)

---

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` files.

### **Backend (`backend/.env`)**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/reqhub"
JWT_SECRET="your_jwt_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
```
🧑‍💻 Local Setup

Clone the repository:

    git clone https://github.com/your-username/ReqHub.git
    cd ReqHub


Install and run backend:

    cd backend
    npm install
    npm run dev


Install and run frontend:

    cd frontend
    npm install
    npm run dev

🎯 Project Highlights

- Built a Postman-like API testing tool from scratch

- Supports both HTTP and WebSocket communication

- Secure authentication and session handling

- Modern UI with Tailwind CSS

- Backend proxy to handle CORS and cookies

- Designed as a full-stack portfolio project

📌 Future Enhancements

- Request collections and folders

- Import/export requests

- Team collaboration workspaces

- Persistent cookie manager UI

- Light/Dark theme toggle

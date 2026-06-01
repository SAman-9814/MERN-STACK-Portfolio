# 🚀 Personal Portfolio & Admin Control Console Monorepo

<div align="center">

![Portfolio Preview](./client/public/assets/aman-ai-avatar.png)

**Full Stack & AI Engineer | Kathmandu, Nepal 🇳🇵**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Portfolio-b820e6?style=for-the-badge)](https://www.amansah.com.np)
[![GitHub](https://img.shields.io/badge/GitHub-SAman--9814-181717?style=for-the-badge&logo=github)](https://github.com/SAman-9814)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Aman_Sah-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/aman-sah9814)
[![Email](https://img.shields.io/badge/Email-sah99017@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:sah99017@gmail.com)

</div>

---

## ✨ Overview

A modern, high-end **personal developer portfolio and management console** structured as a decoupled, professional monorepo.

- **Frontend (`client/`)**: Implemented with **React.js 18, Vite, and Tailwind CSS**. Features custom HTML5 Canvas particle systems, custom spring-based cursor tracking, Lenis smooth scrolling, and advanced Framer Motion entry animations.
- **Backend (`server/`)**: Built on **Node.js, Express, and Mongoose (MongoDB)**. Structured around a clean **MVC/Modular Architecture** split into configs, controllers, middlewares, models, and routes. Features native ES Modules, local image processing using Multer with stateless cloud pipe uploads to **Cloudinary**, and automatic email dispatcher services via **Nodemailer**.

---

## 🎯 Key Features & Interactive Animations

| Module | Features & Visual Physics |
|---|---|
| ⏳ **Cybernetic Preloader** | Loading screen containing dynamic dashboard gauges, progress rings, and real-time scrambled matrix decryption text. |
| 🌀 **3D Orbiting Particle Vortex** | Interactive Canvas particle vortex that accelerates and contracts dynamically based on load percentages, exploding in a radial supernova at 100%. |
| 🌊 **Liquid Wave Page Transition** | Custom SVG path-morph transition curtain that pulls up with an organic fluid wave motion on exit. |
| ✨ **Header Meteor Starfield** | Interactive hero particle mesh background supporting twinkling stars, falling meteors, cursor hover lines, and interactive ripple dynamics. |
| 🤖 **ARIA Chatbot Assistant** | Conversational floating assistant mapped with smart context matching triggers. |
| 💻 **Admin Portal & CRUD Dashboard** | Secure control console for adding, editing, and deleting project listings. Logs user actions, displays database status tiles, and supports file uploads. |
| ☁️ **Cloudinary Integration** | Stateless image uploads converting file buffers to public cloud HTTPS links on submit. |
| 📧 **Nodemailer Responder** | Self-hosted email sender dispatching contact notifications to the owner and customized "Thank You" receipt emails directly to visitors with inline avatar attachments. |
| 💫 **Tactile Hover Mechanics** | Cards float up and cast custom colorful drop-shadow glows (purple, orange, and lavender) dynamically tracking user focus. |

---

## 📂 Project Directory Structure

```
reactjs/
├── client/                     # React / Vite Frontend
│   ├── public/assets/          # Images, AI avatar, and resume PDF
│   ├── src/
│   │   ├── components/         # Page components (Navbar, Header, Work, etc.)
│   │   ├── App.jsx             # Main Router & framer animate lifecycle
│   │   ├── index.css           # Global CSS variables & Tailwind directives
│   │   └── main.jsx            # React client mount point
│   ├── vercel.json             # API proxy rewrites routing configuration
│   ├── package.json            # Client packages & build scripts
│   └── vite.config.js          # Configures local reverse proxy to Port 5000
│
├── server/                     # Express / MongoDB Backend (MVC)
│   ├── config/
│   │   ├── db.js               # Mongoose connection config
│   │   └── cloudinary.js       # Cloudinary cloud storage SDK config
│   ├── controllers/
│   │   ├── authController.js   # Admin Login & JWT validation
│   │   ├── projectController.js# Project CRUD handlers
│   │   ├── uploadController.js # Uploads temporary files to Cloudinary
│   │   ├── contactController.js# Handles Nodemailer dispatch
│   │   └── chatController.js   # Handles Gemini AI Chatbot replies
│   ├── middlewares/
│   │   ├── auth.js             # Protected routes auth validator
│   │   └── upload.js           # Multer storage configuration
│   ├── models/
│   │   ├── User.js             # Admin User Schema
│   │   └── Project.js          # Project Schema
│   ├── routes/                 # Express API Endpoint mappings
│   ├── scripts/
│   │   └── seed.js             # Dedicated CLI database seeding script
│   ├── utils/
│   │   ├── path.js             # ESM relative path helpers
│   │   └── mailer.js           # SMTP Nodemailer transport & HTML mail templates
│   ├── vercel.json             # Backend serverless deployment routing config
│   ├── index.js                # ESM entry point loading dotenv variables
│   └── package.json            # Backend packages & dev runners
│
└── package.json                # Monorepo execution script coordinates
```

---

## 🛠️ API Endpoint Specifications

The backend exposes the following REST API endpoints under a stateless architecture:

### 🔐 Authentication

#### `POST /api/auth/login`
- **Access**: Public
- **Description**: Authenticates admin user credentials and issues a JSON Web Token (JWT) valid for 24h.
- **Request Body**:
  ```json
  {
    "username": "admin",
    "password": "securepassword"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "username": "admin"
  }
  ```

#### `GET /api/auth/verify`
- **Access**: Protected (Requires `Authorization: Bearer <token>`)
- **Description**: Verifies if the active client token remains valid.
- **Response (200 OK)**:
  ```json
  {
    "valid": true,
    "username": "admin"
  }
  ```

---

### 📂 Projects Management (CRUD)

#### `GET /api/projects`
- **Access**: Public
- **Description**: Fetches all projects, sorted by creation timestamp in descending order.
- **Response (200 OK)**:
  ```json
  [
    {
      "_id": "60c72b2f9b1d8e0015c7e123",
      "title": "E-Commerce App",
      "description": "Full-stack online shop.",
      "techStack": ["React", "Express", "MongoDB"],
      "github": "https://github.com/...",
      "live": "https://...",
      "image": "https://res.cloudinary.com/...",
      "createdAt": "2026-06-01T10:00:00.000Z"
    }
  ]
  ```

#### `POST /api/projects`
- **Access**: Protected (Requires `Authorization: Bearer <token>`)
- **Description**: Saves a new project to the database.
- **Request Body**:
  ```json
  {
    "title": "Portfolio Site",
    "description": "Interactive developer portfolio.",
    "techStack": "React, Tailwind, Express",
    "github": "https://github.com/... (optional)",
    "live": "https://... (optional)",
    "image": "https://res.cloudinary.com/... (optional)"
  }
  ```
- **Response (201 Created)**: Returns the newly saved Project JSON object.

#### `PUT /api/projects/:id`
- **Access**: Protected (Requires `Authorization: Bearer <token>`)
- **Description**: Updates fields of an existing project dynamically.
- **Response (200 OK)**: Returns the updated Project JSON object.

#### `DELETE /api/projects/:id`
- **Access**: Protected (Requires `Authorization: Bearer <token>`)
- **Description**: Removes a project from the database.
- **Response (200 OK)**:
  ```json
  {
    "message": "Project deleted successfully",
    "deletedProject": { ... }
  }
  ```

---

### ☁️ Media Uploads & Forms

#### `POST /api/uploads`
- **Access**: Protected (Requires `Authorization: Bearer <token>`)
- **Description**: Accepts multipart form image files, uploads them to Cloudinary, and deletes the temporary files from server disk storage.
- **Request (Multipart Form Data)**:
  - Key: `image` (File buffer)
- **Response (200 OK)**:
  ```json
  {
    "message": "File uploaded successfully to Cloudinary!",
    "url": "https://res.cloudinary.com/your_cloud/image/upload/v123/portfolio_projects/xxx.png",
    "filename": "portfolio_projects/xxx"
  }
  ```

#### `POST /api/contact`
- **Access**: Public
- **Description**: Receives contact form inquiries. Sends a notification mail to the website owner and dispatches a customized thank-you receipt to the visitor.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "message": "Hello, I'd like to hire you!"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Message sent successfully!"
  }
  ```

---

### 🤖 AI Chatbot

#### `POST /api/chat`
- **Access**: Public
- **Description**: Submits a query to ARIA. Leverages Google Gemini API (model `gemini-2.5-flash`) if key is present, with stateless local keyword match fallbacks.
- **Request Body**:
  ```json
  {
    "message": "What is Aman's stack?"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "reply": "Aman works with MERN & PERN stacks including React, Node, Express, MongoDB, and PostgreSQL.",
    "source": "gemini"
  }
  ```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- MongoDB local instance or MongoDB Atlas account

### 1. Installation
Install dependencies for both the frontend client and backend server concurrently from the root directory:

```bash
npm run install:all
```

### 2. Environment Configurations

#### Backend Environment Settings (`server/.env`)
Create a `.env` file inside the `server/` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_signing_secret_key

# Admin Credentials (seeded on first boot if database is empty)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin_secure_password

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Nodemailer SMTP Configuration (e.g. Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_sending_email@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_RECEIVER=your_personal_inbox_email@gmail.com
```

#### Frontend Environment Settings (`client/.env`)
Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 3. Running the Dev Servers
Start both servers from the root directory:

* **Start Backend API Server**:
  ```bash
  npm run dev:server
  ```
  *Accessible at http://localhost:5000*

* **Start Frontend App**:
  ```bash
  npm run dev:client
  ```
  *Accessible at http://localhost:5173 (Vite auto-proxies `/api/*` requests to port 5000)*

---

## 🛡️ Database Seeding CLI Command
Rather than executing queries implicitly during server connectivity, database seeding is handled via a dedicated CLI script. To seed your default admin:
1. Specify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `server/.env` file.
2. Execute the seeding script:
   ```bash
   npm run db:seed --prefix server
   ```
This hashes the specified password via `bcryptjs` and inserts the administrator record into the MongoDB collection if it is currently empty. Default fallback user credentials are (`admin` / `admin123`).

---

## 📧 SMTP Authentication Guide (Gmail)
For secure email deliveries via Nodemailer, using a plain Gmail password will be rejected under modern Google security guidelines. Follow these steps to obtain an **App Password**:
1. Go to your **Google Account settings**.
2. Select **Security** from the left-side menu.
3. Turn on **2-Step Verification** (required to generate App Passwords).
4. Under the "How you sign in to Google" section, select **App passwords** (or search "App passwords" in the search bar).
5. Enter a custom name (e.g. `Portfolio Contact Mailer`) and click **Create**.
6. Copy the generated **16-character code** (displayed in a yellow box) and assign it to the `EMAIL_PASS` field in `server/.env`.

---

## 🌐 Production Deployment Strategies

### Backend API Server (Render, Railway, or Heroku)
1. Set the root folder of your project deployment to `server/` (or run script commands with `--prefix server`).
2. Add your environment variables in the hosting platform's Dashboard settings (corresponding to `server/.env`).
3. Ensure the server's `PORT` is assigned dynamically by the host platform (`process.env.PORT`).

### Frontend Client (Vercel, Netlify, or Amplify)
1. Set the build folder directory to `client/`.
2. Configure build commands:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Configure URL rewrites for single-page routing (e.g. `vercel.json` rewrites redirecting routing requests back to `/index.html`).

---

## 🔧 Physics Configurations (Customizing Animations)

If you'd like to adjust the visual speeds, weights, or density threshold constants of the physics engines:
* **Twinkling Star & Meteor Speed**: Edit constants in [HeaderBackground.jsx](file:///d:/aman-sah-portfolio-main/aman-sah-portfolio-main/reactjs/client/src/components/HeaderBackground.jsx) (e.g., adjust `starCount`, `meteorSpawnRate`, `friction`, or `connectionRadius`).
* **Vortex Particle Rotation**: Adjust the orbit values and spacing variables in [Preloader.jsx](file:///d:/aman-sah-portfolio-main/aman-sah-portfolio-main/reactjs/client/src/components/Preloader.jsx) (e.g. adjust `particleCount`, `warpStrength`, `ripples`).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Aman Sah](https://github.com/SAman-9814)**

⭐ Star this repo if you found it helpful!

</div>

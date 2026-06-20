# 🤝 VolunteerHub — Volunteer Registration System

A full-stack web application for managing volunteer registrations, events, and coordination between volunteers and admins.

**Live Demo:** [volunteerhub-frontend.vercel.app](https://volunteerhub-frontend.vercel.app) &nbsp;|&nbsp; **API:** [volunteerhub-backend-90fr.onrender.com](https://volunteerhub-backend-90fr.onrender.com)

> ⚠️ **Note:** The backend is hosted on Render's free tier and may take **30–50 seconds** to respond on the first request after a period of inactivity (cold start). Please wait before assuming it's down.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Roles & Permissions](#-roles--permissions)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## ✨ Features

### Volunteer
- Register and log in securely
- Browse and search available events by category
- Register for events with a single click
- Track joined events from a personal dashboard
- Manage profile information

### Admin
- Create, edit, and delete events
- View all registered volunteers
- Manage event categories
- Monitor volunteer participation across events
- Role-based access control

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Vite, Tailwind CSS, React Router |
| **Backend** | Python, Flask, SQLAlchemy, Flask-CORS, Bcrypt |
| **Database** | MySQL |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |

---

## 📁 Project Structure

```
volunteer-registration-system/
│
├── frontend/                   # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route-level page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Events.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                    # Frontend env variables (not committed)
│   ├── .env.example
│   └── package.json
│
├── backend/                    # Flask REST API
│   ├── app.py                  # App entry point
│   ├── models.py               # SQLAlchemy models
│   ├── routes/
│   │   ├── auth.py             # /api/auth/*
│   │   └── events.py           # /api/events/*
│   ├── requirements.txt
│   ├── .env                    # Backend env variables (not committed)
│   └── .env.example
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [Python](https://python.org/) 3.10+
- [MySQL](https://dev.mysql.com/downloads/) 8.0+
- `pip` and `venv`

---

### Backend Setup

**1. Clone the repository**

```bash
git clone https://github.com/riyanshigaur8-ai/volunteer-registration-system.git
cd volunteer-registration-system/backend
```

**2. Create and activate a virtual environment**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

**3. Install dependencies**

```bash
pip install -r requirements.txt
```

**4. Set up the database**

Open MySQL and create the database:

```sql
CREATE DATABASE volunteerhub;
```

**5. Configure environment variables**

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=volunteerhub
SECRET_KEY=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

**6. Run the Flask server**

```bash
python app.py
```

The API will be running at `http://localhost:5000`.

---

### Frontend Setup

**1. Navigate to the frontend directory**

```bash
cd ../frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000
```

> For production, set `VITE_API_URL=https://volunteerhub-backend-90fr.onrender.com`

**4. Start the development server**

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend `.env.example`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=volunteerhub
SECRET_KEY=change_this_to_a_random_secret
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env.example`

```env
VITE_API_URL=http://localhost:5000
```

---

## 📡 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and receive session | No |
| `POST` | `/api/auth/logout` | Logout current user | Yes |
| `GET` | `/api/auth/profile` | Get current user info | Yes |

#### Register — `POST /api/auth/register`

```json
{
  "name": "Riya Nshigaur",
  "email": "riya@example.com",
  "password": "securePassword123",
  "role": "volunteer"
}
```

#### Login — `POST /api/auth/login`

```json
{
  "email": "riya@example.com",
  "password": "securePassword123"
}
```

---

### Event Routes — `/api/events`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/events` | Get all events | No |
| `GET` | `/api/events/:id` | Get a single event | No |
| `POST` | `/api/events` | Create a new event | Admin |
| `PUT` | `/api/events/:id` | Update an event | Admin |
| `DELETE` | `/api/events/:id` | Delete an event | Admin |
| `POST` | `/api/events/:id/join` | Volunteer joins an event | Volunteer |
| `GET` | `/api/events/my-events` | Get events joined by user | Volunteer |

---

## 👥 Roles & Permissions

| Feature | Volunteer | Admin |
|---------|-----------|-------|
| Register / Login | ✅ | ✅ |
| Browse events | ✅ | ✅ |
| Join an event | ✅ | ❌ |
| View my events | ✅ | ❌ |
| Create / Edit / Delete events | ❌ | ✅ |
| View all volunteers | ❌ | ✅ |
| Admin dashboard | ❌ | ✅ |

---

## 📸 Screenshots

| Page | Screenshot |
|------|-----------|
| Home / Landing | <img width="1920" height="1080" alt="Landing Page" src="https://github.com/user-attachments/assets/4c27e870-fc76-4744-a529-494a030139d8" />
 || 
 Volunteer Dashboard | <img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/b1a9643d-4a8c-4eba-93d3-4ae28698b865" />
 || 
 Event Listings | <img width="1920" height="1080" alt="Events page" src="https://github.com/user-attachments/assets/9843ad77-f786-4981-9ad9-58d7c8cafbb7" />
 || 
 Admin Dashboard | <img width="1920" height="1080" alt="admin page" src="https://github.com/user-attachments/assets/c94adab2-1adb-4c60-8f8a-386fd5549c86" />
 |

---

## ☁️ Deployment

### Frontend — Vercel

1. Push the `frontend/` folder to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set the root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://volunteerhub-backend-90fr.onrender.com`
5. Deploy

### Backend — Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `python app.py`
6. Add all environment variables from `.env.example`
7. Deploy

---

## 🔮 Future Enhancements

- [ ] JWT-based stateless authentication
- [ ] Email notifications on event registration
- [ ] Event participation certificates (PDF generation)
- [ ] Attendance tracking and QR code check-in
- [ ] Analytics dashboard for admins (charts, reports)
- [ ] Event image uploads (Cloudinary integration)
- [ ] NGO / Organization multi-tenant support
- [ ] Mobile app (React Native)

---

## 👤 Author

**Riyanshi Gaur**
- GitHub: [@riyanshigaur8-ai](https://github.com/riyanshigaur8-ai)
- Project: [volunteer-registration-system](https://github.com/riyanshigaur8-ai/volunteer-registration-system)

---

<p align="center">Made with ❤️ for the internship selection assignment</p>

# 🌟 VolunteerHub

> A full-stack volunteer management platform that connects volunteers with community service opportunities.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen?style=for-the-badge)](https://volunteer-registration-system-cyan.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/riyanshigaur8-ai/volunteer-registration-system)

---

## 📸 Screenshots

### 🏠 Home / Landing Page
<img width="1920" height="1080" alt="Landing Page" src="https://github.com/user-attachments/assets/d9e8d582-4f15-4ca8-8277-c564d22fdc22" />


---

### 🔐 Registration Page
<img width="1920" height="1080" alt="Register page" src="https://github.com/user-attachments/assets/71a4d86a-0dc8-4560-b24a-05387d84f500" />




---

### 🔐 Login Page
<img width="1920" height="1080" alt="Login page" src="https://github.com/user-attachments/assets/c4e2e19d-5e20-48e5-b6b8-07eea552a4b5" />


---

### 📊 Volunteer Dashboard
<img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/5613a824-0604-4cd9-bc91-6bdda6eba6ed" />


---

### 📅 Events Page
<img width="1920" height="1080" alt="Events page" src="https://github.com/user-attachments/assets/d7d06f8f-9c78-49c5-9b1a-f1880a969b04" />


---

### 🛡️ Admin Dashboard
<!-- PASTE YOUR ADMIN DASHBOARD SCREENSHOT HERE -->

---

## ✨ Features

### 👤 Authentication
- User Registration & Login
- Secure Password Hashing with Bcrypt
- Role-Based Access Control (Admin & Volunteer)
- Protected Routes

### 🙋 Volunteer Features
- Volunteer Dashboard
- Browse & Join Events
- My Events Tracking
- Profile Management

### 🗂️ Event Management
- Create & Manage Events
- Event Categories
- View Event Details

### 🛡️ Admin Features
- Admin Dashboard
- Manage All Users & Events

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Vite, Tailwind CSS, React Router |
| **Backend** | Flask, SQLAlchemy, Flask-CORS |
| **Database** | MySQL |
| **Auth** | Bcrypt (Password Hashing) |
| **Deployment** | Vercel (Frontend) |

---

## 📁 Project Structure

```
volunteer-registration-system/
├── frontend/          # React + Vite app
│   ├── src/
│   └── ...
├── backend/           # Flask REST API
│   ├── app.py
│   └── ...
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Python 3.x
- MySQL

### 1. Clone the Repository
```bash
git clone https://github.com/riyanshigaur8-ai/volunteer-registration-system.git
cd volunteer-registration-system
```

### 2. Setup Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Configure Environment Variables

Create a `.env` file in the `backend/` directory:
```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
SECRET_KEY=your_secret_key
```

---

## 🌐 Live Demo

👉 [https://volunteer-registration-system-cyan.vercel.app/](https://volunteer-registration-system-cyan.vercel.app/)

---

## 🔮 Future Enhancements

- [ ] Email Notifications
- [ ] Event Certificates for Volunteers
- [ ] Attendance Tracking
- [ ] NGO Dashboard
- [ ] Analytics & Charts
- [ ] Event Image Uploads

---

## 👩‍💻 Author

**Riyanshi Gaur**
B.Tech — Artificial Intelligence & Machine Learning
Galgotias College of Engineering and Technology

[![GitHub](https://img.shields.io/badge/GitHub-riyanshigaur8--ai-black?style=flat&logo=github)](https://github.com/riyanshigaur8-ai)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

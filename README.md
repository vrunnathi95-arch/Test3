# Student Task Manager

A full-stack web application for students to manage their academic and personal tasks.

![Status](https://img.shields.io/badge/status-ready-brightgreen)
![Backend](https://img.shields.io/badge/backend-FastAPI-009688)
![Frontend](https://img.shields.io/badge/frontend-React-61DAFB)
![Database](https://img.shields.io/badge/database-SQLite-003B57)

---

## 🚀 Quick Start (Easiest Method)

### Windows Users:
1. **Double-click** `START_BOTH.bat` in the project root
2. Wait for both servers to start (about 10-30 seconds)
3. Open your browser to: **http://localhost:5173**

### Alternative Methods:
- **Backend only:** Double-click `START_BACKEND.bat`
- **Frontend only:** Double-click `START_FRONTEND.bat`
- **Manual:** See [HOW_TO_RUN.md](HOW_TO_RUN.md) for detailed manual instructions

---

## 📋 Manual Setup (Cross-Platform)

### Prerequisites
- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn

### Step 1: Backend Setup

Open a terminal and run:

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: **http://localhost:8000**

### Step 2: Frontend Setup

Open a **NEW** terminal and run:

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Frontend will be available at: **http://localhost:5173**

### Step 3: Open the Application

Navigate to: **http://localhost:5173** in your browser

---

## 🎯 Features

### ✅ User Management
- User registration with validation
- Secure login with JWT authentication
- Password hashing with bcrypt
- User profile page

### ✅ Task Management
- Create, read, update, and delete tasks
- Task categories: Assignment, Exam, Project, Study, Personal, Other
- Task priorities: Low, Medium, High
- Task statuses: Pending, In Progress, Completed
- Due date tracking with overdue detection
- Rich task descriptions

### ✅ Dashboard & Analytics
- Total tasks counter
- Status breakdown (Pending, In Progress, Completed, Overdue)
- Priority distribution chart
- Category breakdown
- Completion rate percentage
- Visual statistics cards

### ✅ Advanced Features
- Real-time search across tasks
- Filter by status, priority, category
- Responsive design (mobile, tablet, desktop)
- Loading states and empty states
- Confirmation dialogs
- Error handling with user feedback
- Clean, modern UI inspired by Apple design

---

## 🏗️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite 5** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **JavaScript/JSX** - Programming language

### Backend
- **FastAPI 0.109** - Web framework
- **Uvicorn 0.27** - ASGI server
- **SQLAlchemy 2.0** - ORM
- **Pydantic 2.5** - Data validation
- **Python-JOSE** - JWT handling
- **Passlib** - Password hashing
- **Python 3.10+** - Programming language

### Database
- **SQLite 3** - Database engine
- **SQLAlchemy ORM** - Database abstraction

---

## 📁 Project Structure

```
student-task-manager/
│
├── 📄 START_BOTH.bat          # Start both servers (Windows)
├── 📄 START_BACKEND.bat       # Start backend only (Windows)
├── 📄 START_FRONTEND.bat      # Start frontend only (Windows)
├── 📄 HOW_TO_RUN.md           # Detailed manual instructions
├── 📄 TEST_API.md             # API testing guide
├── 📄 README.md               # This file
│
├── 📂 backend/                # Python FastAPI application
│   ├── app/
│   │   ├── api/routes/        # API endpoints
│   │   │   ├── auth.py        # Authentication routes
│   │   │   ├── tasks.py       # Task CRUD routes
│   │   │   └── dashboard.py   # Statistics routes
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── user.py        # User model
│   │   │   └── task.py        # Task model
│   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── auth.py        # Auth schemas
│   │   │   ├── task.py        # Task schemas
│   │   │   └── dashboard.py   # Dashboard schemas
│   │   ├── services/          # Business logic
│   │   │   ├── user_service.py
│   │   │   └── task_service.py
│   │   ├── core/              # Core utilities
│   │   │   ├── config.py      # Configuration
│   │   │   └── security.py    # JWT & password handling
│   │   ├── database/          # Database setup
│   │   │   └── db.py          # Database connection
│   │   └── main.py            # FastAPI app entry point
│   ├── requirements.txt       # Python dependencies
│   └── README.md
│
├── 📂 frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   ├── Dashboard.jsx  # Dashboard with stats
│   │   │   ├── Tasks.jsx      # Task management
│   │   │   └── Profile.jsx    # User profile
│   │   ├── services/          # API communication
│   │   │   ├── api.js         # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── taskService.js
│   │   │   └── dashboardService.js
│   │   ├── context/           # React Context
│   │   │   └── authContext.jsx
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind imports
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind configuration
│
└── 📂 database/               # SQLite database
    └── student_tasks.db       # Database file (auto-created)
```

---

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user
```

### Tasks
```
GET    /api/tasks            # Get all tasks
POST   /api/tasks            # Create task
GET    /api/tasks/{id}       # Get specific task
PUT    /api/tasks/{id}       # Update task
DELETE /api/tasks/{id}       # Delete task
PATCH  /api/tasks/{id}/status # Update task status
```

### Dashboard
```
GET    /api/dashboard/stats  # Get dashboard statistics
```

### Documentation
```
GET    /docs                 # Swagger UI
GET    /redoc                # ReDoc UI
GET    /health               # Health check
```

---

## 🎨 UI Design Philosophy

The interface follows **Apple's design principles**:
- ✅ Minimal and clean
- ✅ Premium feel
- ✅ Spacious layouts
- ✅ Simple and elegant
- ✅ Strong visual hierarchy
- ✅ Rounded cards with subtle shadows
- ✅ High-quality typography
- ✅ Plenty of whitespace
- ✅ Smooth transitions

**Color Palette:**
- Primary: Blue (#3b82f6)
- Background: Gray (#f8f9fa)
- Text: Dark Gray (#1f2937)
- Borders: Light Gray (#e5e7eb)

---

## 🧪 Testing the Application

### Quick Test:
1. Go to http://localhost:5173
2. Click "Register"
3. Create an account with:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
4. Create a task on the Tasks page
5. View statistics on the Dashboard

### API Testing:
- Visit: **http://localhost:8000/docs**
- Use Swagger UI to test all endpoints interactively

See [TEST_API.md](TEST_API.md) for detailed testing guide.

---

## 🛠️ Development

### Backend Development:
```bash
cd backend
# Code is in app/
# Hot-reload enabled with --reload flag
uvicorn app.main:app --reload --port 8000
```

### Frontend Development:
```bash
cd frontend
# Code is in src/
# Hot-reload automatic with Vite
npm run dev
```

### Database Management:
- Location: `database/student_tasks.db`
- View with: DB Browser for SQLite or VS Code SQLite extension
- Reset: Delete the .db file and restart backend

---

## 📚 Documentation Files

- **[HOW_TO_RUN.md](HOW_TO_RUN.md)** - Detailed manual setup instructions
- **[TEST_API.md](TEST_API.md)** - API testing and usage guide
- **[backend/README.md](backend/README.md)** - Backend-specific documentation

---

## 🐛 Troubleshooting

### Port Already in Use:
```bash
# Backend (port 8000)
uvicorn app.main:app --reload --port 8001

# Frontend (port 5173)
npm run dev -- --port 5174
```

### Dependencies Not Installing:
```bash
# Backend
pip install -r requirements.txt --no-cache-dir

# Frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Database Errors:
```bash
# Delete database and let it recreate
rm database/student_tasks.db
# Restart backend server
```

### 401 Unauthorized:
- Log out and log back in
- Clear browser cookies for localhost
- Check both servers are running

---

## ✅ Success Criteria Met

- ✅ React frontend runs successfully
- ✅ FastAPI backend runs successfully with Uvicorn
- ✅ SQLite database in separate `database/` folder
- ✅ User registration and login working
- ✅ JWT authentication implemented
- ✅ Users can only access their own tasks
- ✅ Dashboard statistics functional
- ✅ Search and filtering working
- ✅ Overdue tasks correctly identified
- ✅ Responsive UI for all devices
- ✅ API documentation via Swagger
- ✅ No major errors
- ✅ Complete documentation

---

## 📝 License

MIT License - Feel free to use this project for learning and development.

---

## 🎉 Getting Help

If you encounter issues:
1. Check [HOW_TO_RUN.md](HOW_TO_RUN.md) for troubleshooting
2. Check both terminal windows for error messages
3. Check browser console (F12) for errors
4. Verify both servers are running on correct ports

---

## 🚀 Next Steps

Optional enhancements you could add:
- [ ] Email notifications for due tasks
- [ ] Task attachments and file uploads
- [ ] Recurring tasks
- [ ] Calendar view
- [ ] Export to CSV/PDF
- [ ] Dark mode
- [ ] Mobile app version
- [ ] Real-time collaboration
- [ ] Task comments and notes

---

**Enjoy managing your tasks! 📚✨**
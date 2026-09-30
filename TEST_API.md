# Student Task Manager - Quick Test Guide

## ✅ Project is Now Running!

### Access Points:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **API ReDoc**: http://localhost:8000/redoc

---

## Quick Start

### 1. Open the Application
Navigate to: **http://localhost:5173**

You will be redirected to the login page.

### 2. Register a New Account
- Click "Register" link
- Fill in:
  - Full Name: `John Doe`
  - Email: `john@example.com`
  - Password: `password123`
- Click "Register"
- You'll be automatically logged in and redirected to Dashboard

### 3. Explore the Dashboard
- See your task statistics (all zeros initially)
- View completion rate and priority/category breakdowns

### 4. Create Your First Task
1. Click "Tasks" in the sidebar
2. Click "+ Add Task"
3. Fill in the form:
   - Title: "Study for Finals"
   - Description: "Prepare for math and physics exams"
   - Category: "Exam"
   - Priority: "High"
   - Due Date: Pick a date
   - Status: "Pending"
4. Click "Create Task"

### 5. Manage Tasks
- **Filter**: Use filters by Status, Priority, Category, or Search
- **Edit**: Click the menu icon (⋮) on a task card and select "Edit"
- **Complete**: Click "Mark as Completed" button
- **Delete**: Click menu icon and select "Delete"

### 6. View Dashboard Stats
- Go back to Dashboard
- See updated statistics:
  - Total Tasks: 1
  - Pending: 0 (if completed)
  - Completed: 1 (if marked as completed)
  - Overdue: Shows tasks past due date

### 7. Check Your Profile
- Click "Profile" in the sidebar
- View account information and authentication token

---

## API Testing

### Via Swagger UI (Easiest):
1. Go to: http://localhost:8000/docs
2. All endpoints are listed with "Try it out" buttons
3. For protected endpoints, you need to pass the token as a query parameter

### Example API Calls:

#### 1. Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "full_name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": 1,
    "full_name": "Jane Smith",
    "email": "jane@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "password123"
}

Response: Same as register
```

#### 3. Create Task
```
POST /api/tasks?token=YOUR_TOKEN
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "Personal",
  "priority": "Low",
  "due_date": "2026-08-20T10:00:00"
}
```

#### 4. Get All Tasks
```
GET /api/tasks?token=YOUR_TOKEN
```

#### 5. Get Dashboard Stats
```
GET /api/dashboard/stats?token=YOUR_TOKEN
```

---

## Features Implemented

### ✅ Backend
- [x] User Registration with password hashing
- [x] User Login with JWT authentication
- [x] Create, Read, Update, Delete tasks
- [x] Task filtering by status, priority, category
- [x] Dashboard statistics
- [x] Overdue task detection
- [x] User isolation (users can only see their own tasks)
- [x] CORS enabled for local development
- [x] SQLite database with proper relationships
- [x] Comprehensive error handling
- [x] Input validation with Pydantic

### ✅ Frontend
- [x] User registration page
- [x] User login page
- [x] Protected routes (redirects to login if not authenticated)
- [x] Dashboard with statistics cards
- [x] Task management page with CRUD operations
- [x] Task filtering and search
- [x] Profile page showing user info
- [x] Responsive design (mobile, tablet, desktop)
- [x] Modern UI inspired by Apple design philosophy
- [x] Loading states and empty states
- [x] Error handling and user feedback
- [x] Clean sidebar navigation
- [x] Logout functionality

---

## Database

Database file is located at:
```
database/student_tasks.db
```

The database is automatically created on first run with the following tables:
- `users` - User accounts
- `tasks` - User tasks

---

## Troubleshooting

### Frontend not loading?
1. Make sure `npm run dev` is running on http://localhost:5173
2. Clear browser cache
3. Check browser console for errors (F12)

### Backend returning 401 Unauthorized?
1. Make sure you're logged in
2. Check that token is being passed in API calls
3. Verify token format (should start with "eyJ")

### Tasks not saving?
1. Check that backend is running on http://localhost:8000
2. Verify database directory exists and is writable
3. Check browser Network tab for API errors

### Port already in use?
If port 8000 or 5173 is in use:
- Backend: Change port with `--port 8001`
- Frontend: Change port with `npm run dev -- --port 5174`

---

## Next Steps (Optional Enhancements)

1. Add more task fields (attachments, tags, reminders)
2. Add task recurrence
3. Add calendar view
4. Add export to CSV/PDF
5. Add email notifications
6. Add multi-user collaboration
7. Add real-time updates with WebSockets
8. Deploy to production with proper environment variables

---

## Commands to Run

### Start Backend:
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

### Start Frontend:
```bash
cd frontend
npm run dev
```

### Access Application:
- Open browser to http://localhost:5173

---

## Project Structure

```
student-task-manager/
├── backend/
│   ├── app/
│   │   ├── api/routes/
│   │   │   ├── auth.py (Login/Register)
│   │   │   ├── tasks.py (Task CRUD)
│   │   │   └── dashboard.py (Statistics)
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   └── task.py
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   ├── task.py
│   │   │   └── dashboard.py
│   │   ├── services/
│   │   │   ├── user_service.py
│   │   │   └── task_service.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── database/
│   │   │   └── db.py
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
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
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── Profile.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── taskService.js
│   │   │   └── dashboardService.js
│   │   ├── context/
│   │   │   └── authContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── database/
    └── student_tasks.db
```

---

## Success Criteria Met ✅

- ✅ React frontend runs on localhost:5173
- ✅ FastAPI backend runs on localhost:8000
- ✅ SQLite database is in database/ folder
- ✅ User registration works
- ✅ User login works
- ✅ JWT authentication is implemented
- ✅ Users can only access their own tasks
- ✅ Dashboard statistics work
- ✅ Task CRUD operations work
- ✅ Search and filtering work
- ✅ Overdue tasks are detected
- ✅ Responsive UI works on all devices
- ✅ API documentation available via Swagger
- ✅ No major console errors
- ✅ Modern, clean UI design

---

Happy task managing! 🎉

# How to Run Student Task Manager Manually

Follow these steps to run the project manually:

---

## Prerequisites

Make sure you have:
- Python 3.10+ installed
- Node.js 18+ installed
- npm installed

---

## Step 1: Open Two Terminal Windows

You need **two separate terminal windows**:
1. One for the Backend (FastAPI server)
2. One for the Frontend (React/Vite dev server)

---

## Step 2: Start the Backend Server

### Terminal 1 (Backend):

1. **Navigate to the backend directory:**
   ```powershell
   cd c:\Users\admin\project1\student-task-manager\backend
   ```

2. **Install dependencies (if not already installed):**
   ```powershell
   pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib python-multipart cryptography email-validator
   ```

3. **Start the server:**
   ```powershell
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **You should see:**
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   INFO:     Started reloader process
   INFO:     Started server process
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   ```

5. **Test it by opening in browser:**
   - http://localhost:8000
   - http://localhost:8000/docs (API documentation)
   - http://localhost:8000/health (health check)

---

## Step 3: Start the Frontend Server

### Terminal 2 (Frontend):

1. **Open a NEW terminal window** (leave the backend running)

2. **Navigate to the frontend directory:**
   ```powershell
   cd c:\Users\admin\project1\student-task-manager\frontend
   ```

3. **Install dependencies (if not already installed):**
   ```powershell
   npm install --legacy-peer-deps
   ```
   
   Note: This may take 1-2 minutes

4. **Start the development server:**
   ```powershell
   npm run dev
   ```

5. **You should see:**
   ```
   VITE v5.x.x  ready in xxx ms
   
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://xxx.xxx.xxx.xxx:5173/
   ➜  press h + enter to show help
   ```

6. **Open the application:**
   - Open your web browser
   - Go to: **http://localhost:5173**

---

## Step 4: Use the Application

### First Time Setup:

1. **Register a new account:**
   - Click "Register" link on the login page
   - Fill in:
     - Full Name: `John Doe`
     - Email: `john@example.com`
     - Password: `password123`
   - Click "Register"

2. **You'll be automatically logged in** and redirected to the Dashboard

3. **Create your first task:**
   - Click "Tasks" in the sidebar
   - Click "+ Add Task" button
   - Fill in the task details
   - Click "Create Task"

4. **View Dashboard statistics:**
   - Click "Dashboard" in the sidebar
   - See your task statistics update

---

## URLs to Know

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend (React App) | http://localhost:5173 | Main application interface |
| Backend API | http://localhost:8000 | REST API server |
| API Documentation | http://localhost:8000/docs | Interactive API docs (Swagger UI) |
| API ReDoc | http://localhost:8000/redoc | Alternative API documentation |
| Health Check | http://localhost:8000/health | Server health status |

---

## Stopping the Servers

### To stop the Backend:
- In Terminal 1, press: **CTRL + C**

### To stop the Frontend:
- In Terminal 2, press: **CTRL + C**

---

## Troubleshooting

### Issue: "Port 8000 is already in use"

**Solution:**
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port:
uvicorn app.main:app --reload --port 8001
```

### Issue: "Port 5173 is already in use"

**Solution:**
```powershell
# Find what's using port 5173
netstat -ano | findstr :5173

# Kill the process
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- --port 5174
```

### Issue: "Module not found" errors in Backend

**Solution:**
```powershell
cd c:\Users\admin\project1\student-task-manager\backend
pip install -r requirements.txt
```

### Issue: Dependencies not installing in Frontend

**Solution:**
```powershell
cd c:\Users\admin\project1\student-task-manager\frontend

# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstall
npm install --legacy-peer-deps
```

### Issue: Database errors

**Solution:**
The database is automatically created on first run. If you have issues:

```powershell
# Delete the database and let it recreate
Remove-Item c:\Users\admin\project1\student-task-manager\database\student_tasks.db

# Restart the backend server
```

### Issue: 401 Unauthorized errors

**Solution:**
- Log out and log back in
- Check that both frontend and backend are running
- Clear browser cache and cookies for localhost

### Issue: Frontend not connecting to Backend

**Solution:**
1. Check both servers are running:
   - Backend: http://localhost:8000/health should return `{"status":"healthy"}`
   - Frontend: http://localhost:5173 should load

2. Check CORS settings in `backend/app/core/config.py`:
   ```python
   CORS_ORIGINS = [
       "http://localhost:5173",
       "http://localhost:3000",
   ]
   ```

3. Check the browser console (F12) for error messages

---

## Quick Commands Reference

### Backend:
```powershell
# Navigate
cd c:\Users\admin\project1\student-task-manager\backend

# Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic python-jose passlib python-multipart cryptography email-validator

# Run server
uvicorn app.main:app --reload --port 8000

# Run on different port
uvicorn app.main:app --reload --port 8001
```

### Frontend:
```powershell
# Navigate
cd c:\Users\admin\project1\student-task-manager\frontend

# Install dependencies
npm install --legacy-peer-deps

# Run dev server
npm run dev

# Run on different port
npm run dev -- --port 5174

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Development Workflow

1. **Make changes to backend code:**
   - Edit files in `backend/app/`
   - Server auto-reloads (if --reload flag is used)
   - Check terminal for errors

2. **Make changes to frontend code:**
   - Edit files in `frontend/src/`
   - Vite hot-reloads automatically
   - Check browser console for errors

3. **Test your changes:**
   - Frontend: Refresh browser or changes auto-apply
   - Backend: Check http://localhost:8000/docs

---

## Database Location

The SQLite database file is automatically created at:
```
c:\Users\admin\project1\student-task-manager\database\student_tasks.db
```

You can inspect it with tools like:
- DB Browser for SQLite (https://sqlitebrowser.org/)
- SQLite Viewer VS Code extension
- SQLite command line: `sqlite3 database/student_tasks.db`

---

## Project File Structure

```
student-task-manager/
│
├── backend/                  # Python FastAPI application
│   ├── app/
│   │   ├── api/             # API routes
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── core/            # Configuration & security
│   │   ├── database/        # Database setup
│   │   └── main.py          # Application entry point
│   └── requirements.txt     # Python dependencies
│
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API communication
│   │   ├── context/         # React Context
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Application entry point
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite configuration
│
├── database/                 # SQLite database
│   └── student_tasks.db     # Database file (auto-created)
│
├── HOW_TO_RUN.md            # This file
├── TEST_API.md              # Testing guide
└── README.md                # Project overview
```

---

## Next Steps After Running

1. ✅ Register a user account
2. ✅ Create some tasks
3. ✅ Try filtering and searching
4. ✅ View dashboard statistics
5. ✅ Explore the API documentation at http://localhost:8000/docs
6. ✅ Test the responsive design on different screen sizes

---

## Support

If you encounter issues:
1. Check both terminal windows for error messages
2. Check browser console (F12) for JavaScript errors
3. Verify both servers are running on correct ports
4. Try restarting both servers
5. Check the troubleshooting section above

---

## Success! 🎉

If you see the login page at http://localhost:5173, you're all set!

The application is now ready to use for managing your student tasks.

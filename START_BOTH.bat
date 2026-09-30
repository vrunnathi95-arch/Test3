@echo off
echo ========================================
echo Starting Student Task Manager
echo ========================================
echo.
echo This will start both Backend and Frontend servers
echo in separate windows.
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to start...
pause > nul

echo.
echo Starting Backend Server...
start "Student Task Manager - Backend" cmd /k "cd /d "%~dp0" && START_BACKEND.bat"

timeout /t 3 > nul

echo Starting Frontend Server...
start "Student Task Manager - Frontend" cmd /k "cd /d "%~dp0" && START_FRONTEND.bat"

echo.
echo Both servers are starting in separate windows.
echo Wait for them to fully start, then open:
echo http://localhost:5173
echo.
echo Close those terminal windows to stop the servers.
echo.
pause

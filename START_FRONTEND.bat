@echo off
echo ========================================
echo Starting Student Task Manager Frontend
echo ========================================
echo.
cd /d "%~dp0\frontend"
echo Installing/checking dependencies...
call npm install --legacy-peer-deps
echo.
echo Starting React development server on http://localhost:5173
echo Press CTRL+C to stop the server
echo.
call npm run dev
pause

@echo off
echo ========================================
echo Starting Student Task Manager Backend
echo ========================================
echo.
cd /d "%~dp0\backend"
echo Installing/checking dependencies...
pip install -r requirements.txt -q
echo.
echo Starting FastAPI server on http://localhost:8000
echo Press CTRL+C to stop the server
echo.
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause

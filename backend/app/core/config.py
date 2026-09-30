"""Application configuration settings."""

import os
from pathlib import Path

# Base directory - go up from app/core/ to root project directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

# Database directory
DB_DIR = BASE_DIR / "database"
DB_DIR.mkdir(exist_ok=True)

# Database settings
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{DB_DIR / 'student_tasks.db'}"
)

# JWT settings
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# CORS settings
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
]
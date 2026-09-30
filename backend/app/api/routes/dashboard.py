"""Dashboard routes - No Auth Version."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.dashboard import DashboardStats
from app.services.task_service import TaskService

router = APIRouter()

# Default user ID for no-auth mode
DEFAULT_USER_ID = 1


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    """Get dashboard statistics."""
    stats = TaskService.get_dashboard_stats(db, DEFAULT_USER_ID)
    return stats

"""Task routes - No Auth Version."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.task import TaskCreate, TaskUpdate, TaskResponse
from app.services.task_service import TaskService

router = APIRouter()

# Default user ID for no-auth mode
DEFAULT_USER_ID = 1


@router.get("/", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    """Get all tasks."""
    tasks = TaskService.get_all_tasks(db, DEFAULT_USER_ID)
    return tasks


@router.post("/", response_model=TaskResponse)
def create_task(task_data: TaskCreate, db: Session = Depends(get_db)):
    """Create a new task."""
    task = TaskService.create_task(
        db,
        user_id=DEFAULT_USER_ID,
        title=task_data.title,
        description=task_data.description,
        category=task_data.category,
        priority=task_data.priority,
        due_date=task_data.due_date,
        status="Pending"
    )
    return task


@router.get("/{task_id}", response_model=TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    """Get a specific task."""
    task = TaskService.get_task_by_id(db, task_id, DEFAULT_USER_ID)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task_data: TaskUpdate, db: Session = Depends(get_db)):
    """Update a task."""
    task = TaskService.update_task(
        db,
        task_id,
        DEFAULT_USER_ID,
        title=task_data.title,
        description=task_data.description,
        category=task_data.category,
        priority=task_data.priority,
        status=task_data.status,
        due_date=task_data.due_date
    )
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Delete a task."""
    success = TaskService.delete_task(db, task_id, DEFAULT_USER_ID)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return {"message": "Task deleted successfully"}


@router.patch("/{task_id}/status")
def update_task_status(task_id: int, status: str, db: Session = Depends(get_db)):
    """Update task status."""
    task = TaskService.update_task(db, task_id, DEFAULT_USER_ID, status=status)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

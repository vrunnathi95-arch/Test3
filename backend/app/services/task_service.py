"""Task service for business logic."""

from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_
from app.models import Task


class TaskService:
    @staticmethod
    def create_task(db: Session, user_id: int, title: str, description: str, 
                   category: str, priority: str, due_date, status: str = "Pending"):
        """Create a new task."""
        task = Task(
            user_id=user_id,
            title=title,
            description=description,
            category=category,
            priority=priority,
            due_date=due_date,
            status=status
        )
        db.add(task)
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def get_task_by_id(db: Session, task_id: int, user_id: int):
        """Get task by ID (only if it belongs to the user)."""
        return db.query(Task).filter(
            and_(Task.id == task_id, Task.user_id == user_id)
        ).first()

    @staticmethod
    def get_all_tasks(db: Session, user_id: int):
        """Get all tasks for a user."""
        return db.query(Task).filter(Task.user_id == user_id).order_by(Task.created_at.desc()).all()

    @staticmethod
    def update_task(db: Session, task_id: int, user_id: int, 
                   title=None, description=None, category=None, 
                   priority=None, status=None, due_date=None):
        """Update a task."""
        task = TaskService.get_task_by_id(db, task_id, user_id)
        if not task:
            return None
        
        if title is not None:
            task.title = title
        if description is not None:
            task.description = description
        if category is not None:
            task.category = category
        if priority is not None:
            task.priority = priority
        if status is not None:
            task.status = status
        if due_date is not None:
            task.due_date = due_date
        
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)
        return task

    @staticmethod
    def delete_task(db: Session, task_id: int, user_id: int):
        """Delete a task."""
        task = TaskService.get_task_by_id(db, task_id, user_id)
        if not task:
            return False
        
        db.delete(task)
        db.commit()
        return True

    @staticmethod
    def get_dashboard_stats(db: Session, user_id: int):
        """Get dashboard statistics for a user."""
        tasks = db.query(Task).filter(Task.user_id == user_id).all()
        
        total = len(tasks)
        pending = sum(1 for t in tasks if t.status == "Pending")
        in_progress = sum(1 for t in tasks if t.status == "In Progress")
        completed = sum(1 for t in tasks if t.status == "Completed")
        
        # Calculate overdue
        now = datetime.utcnow()
        overdue = sum(1 for t in tasks if t.due_date and t.due_date < now and t.status != "Completed")
        
        # Priority breakdown
        priority_breakdown = {
            "Low": sum(1 for t in tasks if t.priority == "Low"),
            "Medium": sum(1 for t in tasks if t.priority == "Medium"),
            "High": sum(1 for t in tasks if t.priority == "High"),
        }
        
        # Category breakdown
        category_breakdown = {}
        for task in tasks:
            category_breakdown[task.category] = category_breakdown.get(task.category, 0) + 1
        
        completion_rate = (completed / total * 100) if total > 0 else 0
        
        return {
            "total": total,
            "pending": pending,
            "in_progress": in_progress,
            "completed": completed,
            "overdue": overdue,
            "completion_rate": completion_rate,
            "priority_breakdown": priority_breakdown,
            "category_breakdown": category_breakdown,
        }

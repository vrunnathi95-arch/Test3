"""Dashboard schemas."""

from pydantic import BaseModel
from typing import Optional, Dict


class DashboardStats(BaseModel):
    total: int
    pending: int
    in_progress: int
    completed: int
    overdue: int
    completion_rate: Optional[float] = None
    priority_breakdown: Optional[Dict[str, int]] = None
    category_breakdown: Optional[Dict[str, int]] = None
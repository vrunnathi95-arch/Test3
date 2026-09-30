"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine, Base
from app.models import User, Task
from app.api.routes import tasks, dashboard


def create_application() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="Student Task Manager API",
        description="API for managing student tasks",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
    )
    
    # Configure CORS - Allow all for development
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
    
    # Create database tables
    Base.metadata.create_all(bind=engine)
    
    # Include routers (no auth required)
    app.include_router(tasks.router, prefix="/api/tasks", tags=["Tasks"])
    app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
    
    return app


app = create_application()


@app.get("/")
def root():
    """Root endpoint."""
    return {
        "message": "Student Task Manager API - No Auth Version",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
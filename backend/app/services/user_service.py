"""User service for business logic."""

from sqlalchemy.orm import Session
from app.models import User
from app.core.security import get_password_hash, verify_password


class UserService:
    @staticmethod
    def create_user(db: Session, full_name: str, email: str, password: str):
        """Create a new user."""
        db_user = db.query(User).filter(User.email == email).first()
        if db_user:
            raise ValueError("Email already registered")
        
        password_hash = get_password_hash(password)
        user = User(full_name=full_name, email=email, password_hash=password_hash)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        """Get user by email."""
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        """Get user by ID."""
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def verify_user_credentials(db: Session, email: str, password: str):
        """Verify user credentials."""
        user = UserService.get_user_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user.password_hash):
            return None
        return user

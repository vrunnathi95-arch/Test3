"""Authentication routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.auth import UserCreate, UserLogin, UserResponse, Token
from app.services.user_service import UserService
from app.core.security import create_access_token, verify_token
from app.models import User

router = APIRouter()


def get_current_user(token: str = None, db: Session = Depends(get_db)):
    """Get current authenticated user from token."""
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    
    user_id = verify_token(token)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return user


@router.post("/register", response_model=dict)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user."""
    try:
        user = UserService.create_user(
            db,
            full_name=user_data.full_name,
            email=user_data.email,
            password=user_data.password
        )
        token = create_access_token(data={"sub": user.id})
        return {
            "user": UserResponse.from_orm(user).dict(),
            "token": token
        }
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/login", response_model=dict)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """Login user."""
    user = UserService.verify_user_credentials(db, credentials.email, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    token = create_access_token(data={"sub": user.id})
    return {
        "user": UserResponse.from_orm(user).dict(),
        "token": token
    }


@router.get("/me", response_model=UserResponse)
def get_current_user_info(token: str = None, db: Session = Depends(get_db)):
    """Get current user information."""
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    
    user_id = verify_token(token)
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    
    return user

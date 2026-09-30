"""Create default user for no-auth mode."""

from app.database.db import SessionLocal
from app.models import User
from app.core.security import get_password_hash

db = SessionLocal()

# Check if user exists
user = db.query(User).filter(User.id == 1).first()

if not user:
    user = User(
        id=1,
        full_name="Guest User",
        email="guest@example.com",
        password_hash=get_password_hash("password")
    )
    db.add(user)
    db.commit()
    print("✅ Default user created (ID: 1)")
else:
    print("✅ Default user already exists")

db.close()

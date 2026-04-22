from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from auth.security import create_token, hash_password, verify_password
from database import get_db
from models.user import User
from schemas.user import UserCreate

router = APIRouter(tags=["auth"])


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email exists")

    new_user = User(**user.model_dump())
    new_user.password = hash_password(user.password)
    db.add(new_user)
    db.commit()
    return {"msg": "User created", "email": new_user.email, "role": new_user.role}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "access_token": create_token({"sub": user.email, "role": user.role.value}),
        "token_type": "bearer",
        "role": user.role,
        "user_id": user.user_id,
        "name": user.name,
    }

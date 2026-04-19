from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.hotel import Hotel
from schemas.hotel import HotelCreate
from auth.security import get_current_user
from models.user import RoleEnum

router = APIRouter(prefix="/hotels")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_hotel(data: HotelCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Admins only")

    hotel = Hotel(**data.model_dump())
    db.add(hotel)
    db.commit()
    return hotel

@router.get("/")
def get_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).all()
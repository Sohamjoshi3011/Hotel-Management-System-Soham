from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.room import Room
from schemas.room import RoomCreate
from auth.security import get_current_user
from models.user import RoleEnum

router = APIRouter(prefix="/rooms")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_room(data: RoomCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role not in [RoleEnum.ADMIN, RoleEnum.MANAGER]:
        raise HTTPException(status_code=403, detail="Not allowed")

    room = Room(**data.model_dump())
    db.add(room)
    db.commit()
    return room

@router.get("/{hotel_id}")
def get_rooms(hotel_id: int, db: Session = Depends(get_db)):
    return db.query(Room).filter(Room.hotel_id == hotel_id).all()

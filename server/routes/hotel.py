from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.security import get_current_user
from database import get_db
from models.hotel import Hotel
from models.user import RoleEnum
from schemas.hotel import HotelCreate

router = APIRouter(prefix="/hotels", tags=["hotels"])


@router.post("/")
def create_hotel(data: HotelCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Admins only")

    hotel = Hotel(name=data.name, location=data.location, image_url=data.image_url, phone_number=data.phone_number)
    db.add(hotel)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.get("/")
def get_hotels(db: Session = Depends(get_db)):
    return db.query(Hotel).all()

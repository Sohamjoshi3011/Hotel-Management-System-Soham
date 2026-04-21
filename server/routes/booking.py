from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.booking import Booking, BookingStatus
from schemas.booking import BookingCreate
from auth.security import get_current_user

router = APIRouter(prefix="/booking")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def book_room(data: BookingCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if data.check_out_date <= data.check_in_date:
        raise HTTPException(status_code=400, detail="Invalid date range")

    if data.check_in_date < date.today():
        raise HTTPException(status_code=400, detail="Cannot book past dates")

    existing = db.query(Booking).filter(
        Booking.room_id == data.room_id,
        Booking.status == BookingStatus.CONFIRMED,
        Booking.check_out_date > data.check_in_date,
        Booking.check_in_date < data.check_out_date
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Room already booked")

    booking = Booking(customer_id=user.user_id, **data.dict())
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.get("/my")
def my_bookings(user=Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Booking).filter(Booking.customer_id == user.user_id).all()

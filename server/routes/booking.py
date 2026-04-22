from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.security import get_current_user
from database import get_db
from models.booking import Booking, BookingStatus, PaymentMode
from models.housekeeping_task import HousekeepingTask
from models.manager_hotel import ManagerHotel
from models.room import Room, RoomStatus
from models.user import RoleEnum
from schemas.booking import BookingCreate

router = APIRouter(tags=["booking"])


def _manager_hotel_room(db: Session, manager_id: int, room_id: int):
    room = db.query(Room).filter(Room.room_id == room_id).first()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    assignment = db.query(ManagerHotel).filter(
        ManagerHotel.manager_id == manager_id,
        ManagerHotel.hotel_id == room.hotel_id,
    ).first()
    if not assignment:
        raise HTTPException(status_code=403, detail="Manager not assigned to this hotel")

    return room


@router.post("/booking")
def book_room(data: BookingCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.MANAGER:
        raise HTTPException(status_code=403, detail="Managers only")

    if data.check_out_date <= data.check_in_date:
        raise HTTPException(status_code=400, detail="Invalid date range")
    if data.check_in_date < date.today():
        raise HTTPException(status_code=400, detail="Cannot book past dates")
    if data.payment_mode == PaymentMode.UPI and not data.payment_transaction_id:
        raise HTTPException(status_code=400, detail="Transaction ID required for UPI")

    room = _manager_hotel_room(db, user.user_id, data.room_id)
    if room.status != RoomStatus.AVAILABLE:
        raise HTTPException(status_code=400, detail="Room not available")

    overlap = db.query(Booking).filter(
        Booking.room_id == data.room_id,
        Booking.status.in_([BookingStatus.BOOKED, BookingStatus.CHECKED_IN]),
        Booking.check_out_date > data.check_in_date,
        Booking.check_in_date < data.check_out_date,
    ).first()
    if overlap:
        raise HTTPException(status_code=400, detail="Room already booked in selected dates")

    booking = Booking(
        customer_id=user.user_id,
        room_id=data.room_id,
        manager_id=user.user_id,
        customer_name=data.customer_name,
        customer_phone=data.customer_phone,
        guests=data.guests,
        booking_type=data.booking_type,
        payment_mode=data.payment_mode,
        payment_transaction_id=data.payment_transaction_id,
        is_paid=True,
        check_in_date=data.check_in_date,
        check_out_date=data.check_out_date,
        status=BookingStatus.BOOKED,
    )

    room.status = RoomStatus.BOOKED
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking


@router.post("/check-in/{booking_id}")
def check_in(booking_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.MANAGER:
        raise HTTPException(status_code=403, detail="Managers only")

    booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.status != BookingStatus.BOOKED:
        raise HTTPException(status_code=400, detail="Booking not in booked state")

    room = _manager_hotel_room(db, user.user_id, booking.room_id)
    room.status = RoomStatus.OCCUPIED
    booking.status = BookingStatus.CHECKED_IN

    db.commit()
    return {"message": "Check-in confirmed"}


@router.post("/check-out/{booking_id}")
def check_out(booking_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.MANAGER:
        raise HTTPException(status_code=403, detail="Managers only")

    booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    if booking.status != BookingStatus.CHECKED_IN:
        raise HTTPException(status_code=400, detail="Booking not checked-in")

    room = _manager_hotel_room(db, user.user_id, booking.room_id)
    room.status = RoomStatus.CLEANING
    booking.status = BookingStatus.CHECKED_OUT
    db.add(HousekeepingTask(room_id=room.room_id, notes="Auto-created on checkout"))

    db.commit()
    return {"message": "Check-out complete, housekeeping task created"}


@router.get("/booking/hotel/{hotel_id}")
def list_hotel_bookings(hotel_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role not in [RoleEnum.ADMIN, RoleEnum.MANAGER]:
        raise HTTPException(status_code=403, detail="Not allowed")

    if user.role == RoleEnum.MANAGER:
        assignment = db.query(ManagerHotel).filter(
            ManagerHotel.manager_id == user.user_id,
            ManagerHotel.hotel_id == hotel_id,
        ).first()
        if not assignment:
            raise HTTPException(status_code=403, detail="Not allowed for this hotel")

    return db.query(Booking).join(Room, Room.room_id == Booking.room_id).filter(Room.hotel_id == hotel_id).all()

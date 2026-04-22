from sqlalchemy import func
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from auth.security import get_current_user
from database import get_db
from models.booking import Booking, BookingStatus
from models.manager_hotel import ManagerHotel
from models.room import Room, RoomStatus
from models.user import RoleEnum
from schemas.room import RoomCreate

router = APIRouter(prefix="/rooms", tags=["rooms"])


def _verify_hotel_access(db: Session, user, hotel_id: int):
    if user.role == RoleEnum.ADMIN:
        return
    if user.role == RoleEnum.MANAGER:
        assignment = db.query(ManagerHotel).filter(
            ManagerHotel.manager_id == user.user_id,
            ManagerHotel.hotel_id == hotel_id,
        ).first()
        if assignment:
            return
    raise HTTPException(status_code=403, detail="Not allowed for this hotel")


@router.post("/")
def create_rooms(data: RoomCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role not in [RoleEnum.ADMIN, RoleEnum.MANAGER]:
        raise HTTPException(status_code=403, detail="Not allowed")

    _verify_hotel_access(db, user, data.hotel_id)

    max_room = db.query(func.max(Room.room_number)).filter(Room.hotel_id == data.hotel_id).scalar() or 0
    created_rooms = []

    for index in range(data.number_of_rooms):
        room = Room(
            hotel_id=data.hotel_id,
            room_number=max_room + index + 1,
            type=data.room_type,
            price=data.price,
            status=RoomStatus.AVAILABLE,
        )
        db.add(room)
        created_rooms.append(room)

    db.commit()
    return {"message": f"Created {len(created_rooms)} rooms", "created": len(created_rooms)}


@router.get("/")
def get_rooms(hotel_id: int = Query(...), db: Session = Depends(get_db)):
    return db.query(Room).filter(Room.hotel_id == hotel_id).order_by(Room.room_number.asc()).all()


@router.get("/available")
def get_available_rooms(hotel_id: int, check_in_date: date, check_out_date: date, db: Session = Depends(get_db)):
    if check_out_date <= check_in_date:
        raise HTTPException(status_code=400, detail="Invalid date range")

    conflicting_room_ids = db.query(Booking.room_id).filter(
        Booking.status.in_([BookingStatus.BOOKED, BookingStatus.CHECKED_IN]),
        Booking.check_out_date > check_in_date,
        Booking.check_in_date < check_out_date,
    )

    return db.query(Room).filter(
        Room.hotel_id == hotel_id,
        Room.status == RoomStatus.AVAILABLE,
        Room.room_id.notin_(conflicting_room_ids),
    ).order_by(Room.room_number.asc()).all()


@router.get("/analytics/{hotel_id}")
def room_analytics(hotel_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    _verify_hotel_access(db, user, hotel_id)

    rooms = db.query(Room).filter(Room.hotel_id == hotel_id).all()
    return {
        "total_rooms": len(rooms),
        "occupied_rooms": len([r for r in rooms if r.status == RoomStatus.OCCUPIED]),
        "available_rooms": len([r for r in rooms if r.status == RoomStatus.AVAILABLE]),
        "cleaning_rooms": len([r for r in rooms if r.status == RoomStatus.CLEANING]),
    }

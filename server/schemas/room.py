from decimal import Decimal
from pydantic import BaseModel, Field
from models.room import RoomStatus


class RoomCreate(BaseModel):
    hotel_id: int
    room_type: str = Field(..., min_length=2)
    price: Decimal
    number_of_rooms: int = Field(..., gt=0, le=200)


class RoomOut(BaseModel):
    room_id: int
    hotel_id: int
    room_number: int
    type: str
    price: Decimal
    status: RoomStatus

    class Config:
        from_attributes = True

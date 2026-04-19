from pydantic import BaseModel

class RoomCreate(BaseModel):
    hotel_id: int
    room_number: int
    type: str
    price: float
from pydantic import BaseModel

class HotelCreate(BaseModel):
    name: str
    location: str
    num_rooms: int
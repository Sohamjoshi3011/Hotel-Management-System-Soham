from pydantic import BaseModel, Field


class HotelCreate(BaseModel):
    name: str = Field(..., min_length=2)
    location: str = Field(..., min_length=2)
    image_url: str | None = None
    phone_number: str | None = None


class HotelOut(HotelCreate):
    hotel_id: int
    num_rooms: int

    class Config:
        from_attributes = True

from pydantic import BaseModel
from datetime import date

class BookingCreate(BaseModel):
    room_id: int
    check_in_date: date
    check_out_date: date
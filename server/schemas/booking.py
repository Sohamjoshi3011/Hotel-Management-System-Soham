from datetime import date
from pydantic import BaseModel, Field
from models.booking import BookingStatus, BookingType, PaymentMode


class BookingCreate(BaseModel):
    room_id: int
    check_in_date: date
    check_out_date: date
    customer_name: str = Field(..., min_length=2)
    customer_phone: str = Field(..., min_length=8)
    guests: int = Field(..., gt=0, le=10)
    booking_type: BookingType
    payment_mode: PaymentMode
    payment_transaction_id: str | None = None


class BookingOut(BaseModel):
    booking_id: int
    room_id: int
    manager_id: int
    customer_name: str
    customer_phone: str
    guests: int
    booking_type: BookingType
    payment_mode: PaymentMode
    payment_transaction_id: str | None
    is_paid: bool
    check_in_date: date
    check_out_date: date
    status: BookingStatus

    class Config:
        from_attributes = True

import enum
from sqlalchemy import BigInteger, Boolean, Column, Date, Enum, ForeignKey, Integer, String
from database import Base


class BookingStatus(str, enum.Enum):
    BOOKED = "BOOKED"
    CHECKED_IN = "CHECKED_IN"
    CHECKED_OUT = "CHECKED_OUT"
    CANCELLED = "CANCELLED"


class BookingType(str, enum.Enum):
    CALL = "CALL"
    WALK_IN = "WALK_IN"


class PaymentMode(str, enum.Enum):
    UPI = "UPI"
    CASH = "CASH"


class Booking(Base):
    __tablename__ = "bookings"

    booking_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(BigInteger, ForeignKey("User.user_id"), nullable=True)
    room_id = Column(Integer, ForeignKey("rooms.room_id"), nullable=False)
    manager_id = Column(BigInteger, nullable=False)
    customer_name = Column(String(255), nullable=False)
    customer_phone = Column(String(20), nullable=False)
    guests = Column(Integer, nullable=False, default=1)
    booking_type = Column(Enum(BookingType), nullable=False)
    payment_mode = Column(Enum(PaymentMode), nullable=False)
    payment_transaction_id = Column(String(100), nullable=True)
    is_paid = Column(Boolean, default=False)
    check_in_date = Column(Date, nullable=False)
    check_out_date = Column(Date, nullable=False)
    status = Column(Enum(BookingStatus), default=BookingStatus.BOOKED, nullable=False)

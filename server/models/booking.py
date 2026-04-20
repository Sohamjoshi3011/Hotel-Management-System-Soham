from sqlalchemy import Column, Integer, BigInteger, ForeignKey, Date, Enum
from database import Base
import enum

class BookingStatus(str, enum.Enum):
    CONFIRMED = "CONFIRMED"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"

class Booking(Base):
    __tablename__ = "bookings"
    booking_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(BigInteger, ForeignKey("User.user_id"))
    room_id = Column(Integer, ForeignKey("rooms.room_id"))
    manager_id = Column(BigInteger)
    check_in_date = Column(Date)
    check_out_date = Column(Date)
    status = Column(Enum(BookingStatus), default=BookingStatus.CONFIRMED)
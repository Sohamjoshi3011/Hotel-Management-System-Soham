import enum
from sqlalchemy import BigInteger, Column, DECIMAL, Enum, ForeignKey, Integer, String
from database import Base


class RoomStatus(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    BOOKED = "BOOKED"
    OCCUPIED = "OCCUPIED"
    CLEANING = "CLEANING"


class Room(Base):
    __tablename__ = "rooms"

    room_id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(BigInteger, ForeignKey("Hotels.hotel_id"), nullable=False)
    room_number = Column(Integer, nullable=False)
    type = Column(String(50), nullable=False)
    price = Column(DECIMAL(10, 2), nullable=False)
    status = Column(Enum(RoomStatus), default=RoomStatus.AVAILABLE, nullable=False)

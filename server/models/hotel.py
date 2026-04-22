from sqlalchemy import BigInteger, Column, Integer, String
from database import Base


class Hotel(Base):
    __tablename__ = "Hotels"

    hotel_id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    location = Column(String(255), nullable=False)
    num_rooms = Column(Integer, nullable=False, default=0)
    image_url = Column(String(500), nullable=True)
    phone_number = Column(String(20), nullable=True)

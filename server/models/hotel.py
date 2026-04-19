from sqlalchemy import Column, String, BigInteger, Integer
from database import Base

class Hotel(Base):
    __tablename__ = "Hotels"
    hotel_id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255))
    location = Column(String(255))
    num_rooms = Column(Integer)
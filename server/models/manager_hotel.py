from sqlalchemy import Column, BigInteger
from database import Base

class ManagerHotel(Base):
    __tablename__ = "manager_hotel"
    manager_id = Column(BigInteger, primary_key=True)
    hotel_id = Column(BigInteger, primary_key=True)
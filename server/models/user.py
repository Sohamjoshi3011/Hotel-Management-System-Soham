from sqlalchemy import Column, String, BigInteger, Enum
from database import Base
import enum

class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    CUSTOMER = "CUSTOMER"

class User(Base):
    __tablename__ = "User"
    user_id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255))
    email = Column(String(255), unique=True)
    password = Column(String(255))
    role = Column(Enum(RoleEnum))
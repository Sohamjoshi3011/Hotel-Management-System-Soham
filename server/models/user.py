import enum
from sqlalchemy import BigInteger, Column, Enum, String
from database import Base


class RoleEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    HOUSEKEEPING = "HOUSEKEEPING"
    CUSTOMER = "CUSTOMER"


class User(Base):
    __tablename__ = "User"

    user_id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False, default=RoleEnum.CUSTOMER)

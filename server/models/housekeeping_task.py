import enum
from sqlalchemy import Column, Enum, ForeignKey, Integer, String
from database import Base


class HousekeepingTaskStatus(str, enum.Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"


class HousekeepingTask(Base):
    __tablename__ = "housekeeping_tasks"

    task_id = Column(Integer, primary_key=True, index=True)
    room_id = Column(Integer, ForeignKey("rooms.room_id"), nullable=False)
    notes = Column(String(255), nullable=True)
    status = Column(Enum(HousekeepingTaskStatus), default=HousekeepingTaskStatus.PENDING, nullable=False)

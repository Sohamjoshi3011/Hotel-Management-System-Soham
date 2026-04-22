from pydantic import BaseModel
from models.housekeeping_task import HousekeepingTaskStatus


class HousekeepingTaskOut(BaseModel):
    task_id: int
    room_id: int
    notes: str | None
    status: HousekeepingTaskStatus

    class Config:
        from_attributes = True

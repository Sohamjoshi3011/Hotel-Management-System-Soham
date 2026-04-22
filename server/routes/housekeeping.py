from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.security import get_current_user
from database import get_db
from models.housekeeping_task import HousekeepingTask, HousekeepingTaskStatus
from models.room import Room, RoomStatus
from models.user import RoleEnum

router = APIRouter(prefix="/housekeeping", tags=["housekeeping"])


@router.get("/tasks")
def get_tasks(user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role not in [RoleEnum.HOUSEKEEPING, RoleEnum.ADMIN, RoleEnum.MANAGER]:
        raise HTTPException(status_code=403, detail="Not allowed")

    return db.query(HousekeepingTask).filter(HousekeepingTask.status == HousekeepingTaskStatus.PENDING).all()


@router.post("/tasks/{task_id}/complete")
def mark_task_complete(task_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role not in [RoleEnum.HOUSEKEEPING, RoleEnum.ADMIN]:
        raise HTTPException(status_code=403, detail="Not allowed")

    task = db.query(HousekeepingTask).filter(HousekeepingTask.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    room = db.query(Room).filter(Room.room_id == task.room_id).first()
    if room:
        room.status = RoomStatus.AVAILABLE

    task.status = HousekeepingTaskStatus.COMPLETED
    db.commit()
    return {"message": "Task completed and room set to available"}

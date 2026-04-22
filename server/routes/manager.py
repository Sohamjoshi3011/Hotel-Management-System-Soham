from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from auth.security import get_current_user
from database import get_db
from models.manager_hotel import ManagerHotel
from models.user import RoleEnum, User
from schemas.manager import AssignManagerRequest

router = APIRouter(prefix="/manager", tags=["manager"])


@router.post("/assign")
def assign_manager(payload: AssignManagerRequest, user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Admins only")

    manager = db.query(User).filter(User.user_id == payload.manager_id, User.role == RoleEnum.MANAGER).first()
    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found")

    existing = db.query(ManagerHotel).filter(
        ManagerHotel.manager_id == payload.manager_id,
        ManagerHotel.hotel_id == payload.hotel_id,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already assigned")

    assignment = ManagerHotel(manager_id=payload.manager_id, hotel_id=payload.hotel_id)
    db.add(assignment)
    db.commit()
    return {"msg": "Manager assigned"}


@router.get("/my-hotels")
def get_my_hotels(user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.MANAGER:
        raise HTTPException(status_code=403, detail="Managers only")

    return db.query(ManagerHotel).filter(ManagerHotel.manager_id == user.user_id).all()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models.manager_hotel import ManagerHotel
from models.user import RoleEnum
from auth.security import get_current_user

router = APIRouter(prefix="/manager")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/assign")
def assign_manager(manager_id: int, hotel_id: int, user=Depends(get_current_user), db: Session = Depends(get_db)):
    # Only admin can assign
    if user.role != RoleEnum.ADMIN:
        raise HTTPException(status_code=403, detail="Admins only")

    existing = db.query(ManagerHotel).filter(
        ManagerHotel.manager_id == manager_id,
        ManagerHotel.hotel_id == hotel_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already assigned")

    assignment = ManagerHotel(manager_id=manager_id, hotel_id=hotel_id)
    db.add(assignment)
    db.commit()
    return {"msg": "Manager assigned"}

@router.get("/my-hotels")
def get_my_hotels(user=Depends(get_current_user), db: Session = Depends(get_db)):
    if user.role != RoleEnum.MANAGER:
        raise HTTPException(status_code=403, detail="Managers only")

    return db.query(ManagerHotel).filter(ManagerHotel.manager_id == user.user_id).all()

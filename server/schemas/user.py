from pydantic import BaseModel
from models.user import RoleEnum

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: RoleEnum
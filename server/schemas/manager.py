from pydantic import BaseModel


class AssignManagerRequest(BaseModel):
    manager_id: int
    hotel_id: int

from fastapi import FastAPI
from routes import auth, hotel, room, booking, manager

app = FastAPI()

app.include_router(auth.router)
app.include_router(hotel.router)
app.include_router(room.router)
app.include_router(booking.router)
app.include_router(manager.router)

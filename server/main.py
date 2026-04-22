from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import auth, booking, hotel, housekeeping, manager, room

app = FastAPI(title="Hotel Management System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(hotel.router)
app.include_router(room.router)
app.include_router(booking.router)
app.include_router(manager.router)
app.include_router(housekeeping.router)


@app.get("/")
def health_check():
    return {"status": "ok"}

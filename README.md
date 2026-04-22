# Hotel Management System (FastAPI + React)

A full-stack Hotel Management System with role-based workflows for **Admin**, **Manager**, and **Housekeeping**.

## Stack

- **Backend:** FastAPI, SQLAlchemy ORM, JWT
- **Frontend:** React (Vite), Tailwind CSS, Axios, React Router
- **Database:** MySQL via Railway, configured through `DATABASE_URL`

---

## Project Structure

- `server/` → FastAPI backend
- `frontend/` → React + Tailwind frontend

---

## Backend Setup

1. Create a `.env` file in `server/`:

```env
DATABASE_URL=mysql+pymysql://username:password@host:port/database
JWT_SECRET_KEY=change_this
JWT_ACCESS_MINUTES=60
```

2. Install dependencies:

```bash
cd server
pip install -r requirements.txt
```

3. Run API:

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

1. Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

2. Install and run:

```bash
cd frontend
npm install
npm run dev
```

---

## Implemented Features

### Public / Landing
- Premium landing page with hero section and hotel listing.
- Hotel cards include image, location, price, rating, and phone contact.

### Admin
- Add hotels with name, location, image URL, phone number.
- Assign managers to hotels.

### Manager Dashboard
- Sidebar + navbar style layout.
- Room analytics (total, occupied, available, cleaning).
- Room grid with color-coded status and modal details.
- Bulk room creation with auto room-number generation.
- Booking flow (CALL/WALK_IN, UPI/CASH).
- Check-in and check-out transitions.

### Housekeeping
- Housekeeping task list for cleaning rooms.
- Complete task to move room back to available.

---

## API Endpoints

- `POST /signup`
- `POST /login`
- `GET /hotels/`
- `POST /hotels/`
- `POST /manager/assign`
- `GET /rooms/?hotel_id=...`
- `POST /rooms/`
- `GET /rooms/available`
- `GET /rooms/analytics/{hotel_id}`
- `POST /booking`
- `POST /check-in/{booking_id}`
- `POST /check-out/{booking_id}`
- `GET /booking/hotel/{hotel_id}`
- `GET /housekeeping/tasks`
- `POST /housekeeping/tasks/{task_id}/complete`

---

## Status Flow

`AVAILABLE -> BOOKED -> OCCUPIED -> CLEANING -> AVAILABLE`


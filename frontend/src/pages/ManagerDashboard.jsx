import { useEffect, useState } from 'react'
import RoomCard from '../components/RoomCard'
import api from '../services/api'


const analyticsMeta = {
  total_rooms: { label: 'Total Rooms', icon: '🏨', color: 'from-blue-500 to-blue-600' },
  occupied_rooms: { label: 'Occupied', icon: '🛏️', color: 'from-rose-500 to-red-500' },
  available_rooms: { label: 'Available', icon: '✅', color: 'from-emerald-500 to-green-500' },
  cleaning_rooms: { label: 'Cleaning', icon: '🧽', color: 'from-amber-400 to-yellow-500' },
}


export default function ManagerDashboard() {
  const [hotelId, setHotelId] = useState(1)
  const [rooms, setRooms] = useState([])
  const [analytics, setAnalytics] = useState({})
  const [selectedRoom, setSelectedRoom] = useState(null)

  const load = async () => {
    const [roomRes, analyticsRes] = await Promise.all([
      api.get('/rooms/', { params: { hotel_id: hotelId } }),
      api.get(`/rooms/analytics/${hotelId}`),
    ])
    setRooms(roomRes.data)
    setAnalytics(analyticsRes.data)
  }

  useEffect(() => { load() }, [hotelId])

  return (
    <div className="space-y-6">
      <div className="card p-4 flex items-center gap-2">
        <label>Hotel ID</label>
        <input className="border p-2 rounded" value={hotelId} onChange={(e) => setHotelId(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(analytics).map(([k, v]) => <div key={k} className="card p-4"><p className="text-textGray text-sm">{k}</p><p className="text-2xl font-bold">{v}</p></div>)}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {rooms.map((room) => <RoomCard key={room.room_id} room={room} onClick={setSelectedRoom} />)}
      </div>

      {selectedRoom && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center" onClick={() => setSelectedRoom(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-xl mb-2">Room {selectedRoom.room_number}</h3>
            <p>Type: {selectedRoom.type}</p>
            <p>Status: {selectedRoom.status}</p>
            <p>Price: ₹{selectedRoom.price}</p>
          </div>
        </div>
      )}
    </div>
  )
}

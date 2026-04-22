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
    <div className="space-y-7">
      <div className="card p-5 flex flex-wrap items-center gap-3 justify-between">
        <div>
          <p className="text-sm text-textGray">Hotel workspace</p>
          <h2 className="font-bold text-2xl">Room Operations</h2>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-textGray">Hotel ID</label>
          <input className="border border-slate-200 px-3 py-2 rounded-xl shadow-inner" value={hotelId} onChange={(e) => setHotelId(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {Object.entries(analytics).map(([k, v]) => {
          const meta = analyticsMeta[k] || { label: k, icon: 'ℹ️', color: 'from-slate-500 to-slate-600' }
          return (
            <div key={k} className={`rounded-2xl p-5 text-white bg-gradient-to-br ${meta.color} shadow-lg`}>
              <div className="flex items-start justify-between">
                <p className="text-sm text-white/85">{meta.label}</p>
                <span className="text-xl">{meta.icon}</span>
              </div>
              <p className="text-4xl font-bold mt-4">{v}</p>
            </div>
          )
        })}
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Room Grid</h3>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {rooms.map((room) => <RoomCard key={room.room_id} room={room} onClick={setSelectedRoom} />)}
        </div>
      </div>

      {selectedRoom && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm grid place-items-center z-50" onClick={() => setSelectedRoom(null)}>
          <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-2xl mb-3">Room {selectedRoom.room_number}</h3>
            <div className="space-y-2 text-textGray">
              <p><span className="font-semibold text-textDark">Type:</span> {selectedRoom.type}</p>
              <p><span className="font-semibold text-textDark">Status:</span> {selectedRoom.status}</p>
              <p><span className="font-semibold text-textDark">Price:</span> ₹{selectedRoom.price}</p>
            </div>
            <button onClick={() => setSelectedRoom(null)} className="mt-5 w-full btn-primary">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

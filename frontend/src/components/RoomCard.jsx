import { roomStatusClass } from '../utils/statusColors'

export default function RoomCard({ room, onClick }) {
  return (
    <button
      onClick={() => onClick(room)}

      className={`w-full text-left border p-5 rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl ${roomStatusClass[room.status] || 'bg-white border-slate-200'}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold text-lg">Room {room.room_number}</div>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white/70">{room.status}</span>
      </div>
      <div className="text-sm opacity-85">{room.type}</div>
      <div className="text-base font-semibold mt-1">₹{room.price}</div>

      className={`w-full text-left border p-4 rounded-xl transition hover:-translate-y-0.5 ${roomStatusClass[room.status] || 'bg-white'}`}
    >
      <div className="font-semibold">Room {room.room_number}</div>
      <div className="text-sm">{room.type}</div>
      <div className="text-sm">₹{room.price}</div>

    </button>
  )
}

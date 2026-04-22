import { roomStatusClass } from '../utils/statusColors'

export default function RoomCard({ room, onClick }) {
  return (
    <button
      onClick={() => onClick(room)}
      className={`w-full text-left border p-4 rounded-xl transition hover:-translate-y-0.5 ${roomStatusClass[room.status] || 'bg-white'}`}
    >
      <div className="font-semibold">Room {room.room_number}</div>
      <div className="text-sm">{room.type}</div>
      <div className="text-sm">₹{room.price}</div>
    </button>
  )
}

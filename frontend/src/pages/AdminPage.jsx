import { useState } from 'react'
import api from '../services/api'

export default function AdminPage() {
  const [hotel, setHotel] = useState({ name: '', location: '', image_url: '', phone_number: '' })
  const [assign, setAssign] = useState({ manager_id: '', hotel_id: '' })

  const createHotel = async (e) => {
    e.preventDefault()
    await api.post('/hotels/', hotel)
    alert('Hotel added')
  }

  const assignManager = async (e) => {
    e.preventDefault()
    await api.post('/manager/assign', { ...assign, manager_id: Number(assign.manager_id), hotel_id: Number(assign.hotel_id) })
    alert('Manager assigned')
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      <form className="card p-5 space-y-3" onSubmit={createHotel}>
        <h2 className="text-xl font-bold">Add Hotel</h2>
        <input className="w-full border rounded p-2" placeholder="Name" value={hotel.name} onChange={(e) => setHotel((s) => ({ ...s, name: e.target.value }))} required />
        <input className="w-full border rounded p-2" placeholder="Location" value={hotel.location} onChange={(e) => setHotel((s) => ({ ...s, location: e.target.value }))} required />
        <input className="w-full border rounded p-2" placeholder="Image URL" value={hotel.image_url} onChange={(e) => setHotel((s) => ({ ...s, image_url: e.target.value }))} />
        <input className="w-full border rounded p-2" placeholder="Phone number" value={hotel.phone_number} onChange={(e) => setHotel((s) => ({ ...s, phone_number: e.target.value }))} required />
        <button disabled={loading} className="bg-primary text-white rounded px-4 py-2 disabled:opacity-60">{loading ? 'Saving...' : 'Create'}</button>
        {Object.keys(hotel).map((k) => <input key={k} className="w-full border rounded p-2" placeholder={k} value={hotel[k]} onChange={(e) => setHotel((s) => ({ ...s, [k]: e.target.value }))} />)}
        <button className="bg-primary text-white rounded px-4 py-2">Create</button>
      </form>

      <form className="card p-5 space-y-3" onSubmit={assignManager}>
        <h2 className="text-xl font-bold">Assign Manager</h2>
        <input className="w-full border rounded p-2" type="number" placeholder="Manager ID" value={assign.manager_id} onChange={(e) => setAssign((s) => ({ ...s, manager_id: e.target.value }))} required />
        <input className="w-full border rounded p-2" type="number" placeholder="Hotel ID" value={assign.hotel_id} onChange={(e) => setAssign((s) => ({ ...s, hotel_id: e.target.value }))} required />
        <button disabled={loading} className="bg-emerald text-white rounded px-4 py-2 disabled:opacity-60">{loading ? 'Assigning...' : 'Assign'}</button>
      </form>

      {message && <p className="md:col-span-2 text-sm font-medium">{message}</p>}
        <input className="w-full border rounded p-2" placeholder="Manager ID" value={assign.manager_id} onChange={(e) => setAssign((s) => ({ ...s, manager_id: e.target.value }))} />
        <input className="w-full border rounded p-2" placeholder="Hotel ID" value={assign.hotel_id} onChange={(e) => setAssign((s) => ({ ...s, hotel_id: e.target.value }))} />
        <button className="bg-emerald text-white rounded px-4 py-2">Assign</button>
      </form>
    </div>
  )
}

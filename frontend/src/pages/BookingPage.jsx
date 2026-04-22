import { useEffect, useState } from 'react'
import api from '../services/api'

const initial = {
  room_id: '',
  check_in_date: '',
  check_out_date: '',
  customer_name: '',
  customer_phone: '',
  guests: 1,
  booking_type: 'CALL',
  payment_mode: 'CASH',
  payment_transaction_id: '',
}

export default function BookingPage() {
  const [hotelId, setHotelId] = useState(1)
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState(initial)
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('')

  const loadBookings = async () => {
    try {
      const res = await api.get(`/booking/hotel/${hotelId}`)
      setBookings(res.data || [])
    } catch (err) {
      setStatus(`❌ ${err.message}`)
      setBookings([])
    }
  }

  useEffect(() => {
    loadBookings()
  }, [hotelId])

  const searchRooms = async () => {
    setStatus('')
    try {
      const res = await api.get('/rooms/available', {
        params: {
          hotel_id: Number(hotelId),
          check_in_date: form.check_in_date,
          check_out_date: form.check_out_date,
        },
      })
      setRooms(res.data || [])
      if (!res.data?.length) setStatus('No available rooms for selected dates')
    } catch (err) {
      setStatus(`❌ ${err.message}`)
      setRooms([])
    }

  useEffect(() => {
    api.get(`/booking/hotel/${hotelId}`).then((res) => setBookings(res.data)).catch(() => setBookings([]))
  }, [hotelId])

  const searchRooms = async () => {
    const res = await api.get('/rooms/available', { params: { hotel_id: hotelId, check_in_date: form.check_in_date, check_out_date: form.check_out_date } })
    setRooms(res.data)
  }

  const book = async (e) => {
    e.preventDefault()
    setStatus('')
    try {
      await api.post('/booking', {
        ...form,
        room_id: Number(form.room_id),
        guests: Number(form.guests),
      })
      setStatus('✅ Booking created')
      setForm(initial)
      await loadBookings()
    } catch (err) {
      setStatus(`❌ ${err.message}`)
    }
  }

  const updateBooking = async (action, id) => {
    try {
      await api.post(`/${action}/${id}`)
      setStatus(`✅ ${action === 'check-in' ? 'Check-in' : 'Check-out'} completed`)
      await loadBookings()
    } catch (err) {
      setStatus(`❌ ${err.message}`)
    }
    await api.post('/booking', { ...form, room_id: Number(form.room_id), guests: Number(form.guests) })
    alert('Booking created')
  }

  const checkIn = async (id) => {
    await api.post(`/check-in/${id}`)
    alert('Checked in')
  }

  const checkOut = async (id) => {
    await api.post(`/check-out/${id}`)
    alert('Checked out')
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form className="card p-5 space-y-3" onSubmit={book}>
        <h2 className="font-bold text-xl">Create Booking</h2>
        <input className="border p-2 rounded w-full" type="number" placeholder="Hotel ID" value={hotelId} onChange={(e) => setHotelId(e.target.value)} required />
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" type="date" value={form.check_in_date} onChange={(e) => setForm((s) => ({ ...s, check_in_date: e.target.value }))} required />
          <input className="border p-2 rounded" type="date" value={form.check_out_date} onChange={(e) => setForm((s) => ({ ...s, check_out_date: e.target.value }))} required />
        </div>
        <button type="button" onClick={searchRooms} className="border border-primary text-primary px-3 py-2 rounded">Show available rooms</button>
        <select className="border p-2 rounded w-full" value={form.room_id} onChange={(e) => setForm((s) => ({ ...s, room_id: e.target.value }))} required>
          <option value="">Select room</option>
          {rooms.map((r) => <option key={r.room_id} value={r.room_id}>Room {r.room_number}</option>)}
        </select>
        <input className="border p-2 rounded w-full" placeholder="Customer name" value={form.customer_name} onChange={(e) => setForm((s) => ({ ...s, customer_name: e.target.value }))} required />
        <input className="border p-2 rounded w-full" placeholder="Customer phone" value={form.customer_phone} onChange={(e) => setForm((s) => ({ ...s, customer_phone: e.target.value }))} required />
        <input className="border p-2 rounded w-full" type="number" min="1" placeholder="Guests" value={form.guests} onChange={(e) => setForm((s) => ({ ...s, guests: e.target.value }))} required />
        <div className="grid grid-cols-2 gap-2">
          <select className="border p-2 rounded" value={form.booking_type} onChange={(e) => setForm((s) => ({ ...s, booking_type: e.target.value }))}>
            <option value="CALL">CALL</option><option value="WALK_IN">WALK_IN</option>
          </select>
          <select className="border p-2 rounded" value={form.payment_mode} onChange={(e) => setForm((s) => ({ ...s, payment_mode: e.target.value }))}>
            <option value="CASH">CASH</option><option value="UPI">UPI</option>
          </select>
        </div>
        {form.payment_mode === 'UPI' && <input className="border p-2 rounded w-full" placeholder="Transaction ID" value={form.payment_transaction_id} onChange={(e) => setForm((s) => ({ ...s, payment_transaction_id: e.target.value }))} required />}
        <button className="bg-primary text-white px-4 py-2 rounded">Create Booking</button>
        {status && <p className="text-sm">{status}</p>}
        <input className="border p-2 rounded w-full" placeholder="Hotel ID" value={hotelId} onChange={(e) => setHotelId(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <input className="border p-2 rounded" type="date" value={form.check_in_date} onChange={(e) => setForm((s) => ({ ...s, check_in_date: e.target.value }))} />
          <input className="border p-2 rounded" type="date" value={form.check_out_date} onChange={(e) => setForm((s) => ({ ...s, check_out_date: e.target.value }))} />
        </div>
        <button type="button" onClick={searchRooms} className="border border-primary text-primary px-3 py-2 rounded">Show available rooms</button>
        <select className="border p-2 rounded w-full" value={form.room_id} onChange={(e) => setForm((s) => ({ ...s, room_id: e.target.value }))}>
          <option value="">Select room</option>
          {rooms.map((r) => <option key={r.room_id} value={r.room_id}>Room {r.room_number}</option>)}
        </select>
        <input className="border p-2 rounded w-full" placeholder="Customer name" value={form.customer_name} onChange={(e) => setForm((s) => ({ ...s, customer_name: e.target.value }))} />
        <input className="border p-2 rounded w-full" placeholder="Customer phone" value={form.customer_phone} onChange={(e) => setForm((s) => ({ ...s, customer_phone: e.target.value }))} />
        <input className="border p-2 rounded w-full" placeholder="Guests" value={form.guests} onChange={(e) => setForm((s) => ({ ...s, guests: e.target.value }))} />
        <div className="grid grid-cols-2 gap-2">
          <select className="border p-2 rounded" value={form.booking_type} onChange={(e) => setForm((s) => ({ ...s, booking_type: e.target.value }))}>
            <option>CALL</option><option>WALK_IN</option>
          </select>
          <select className="border p-2 rounded" value={form.payment_mode} onChange={(e) => setForm((s) => ({ ...s, payment_mode: e.target.value }))}>
            <option>CASH</option><option>UPI</option>
          </select>
        </div>
        {form.payment_mode === 'UPI' && <input className="border p-2 rounded w-full" placeholder="Transaction ID" value={form.payment_transaction_id} onChange={(e) => setForm((s) => ({ ...s, payment_transaction_id: e.target.value }))} />}
        <button className="bg-primary text-white px-4 py-2 rounded">Create Booking</button>
      </form>

      <div className="card p-5">
        <h2 className="font-bold text-xl mb-3">Bookings</h2>
        <div className="space-y-3 max-h-[70vh] overflow-auto">
          {bookings.map((b) => (
            <div key={b.booking_id} className="border rounded-lg p-3">
              <p className="font-semibold">#{b.booking_id} - Room {b.room_id}</p>
              <p className="text-sm">{b.customer_name} • {b.status}</p>
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => updateBooking('check-in', b.booking_id)} className="px-3 py-1 rounded bg-emerald text-white text-sm">Check-in</button>
                <button type="button" onClick={() => updateBooking('check-out', b.booking_id)} className="px-3 py-1 rounded bg-gold text-white text-sm">Check-out</button>
              </div>
            </div>
          ))}
          {!bookings.length && <p className="text-sm text-textGray">No bookings found.</p>}
                <button onClick={() => checkIn(b.booking_id)} className="px-3 py-1 rounded bg-emerald text-white text-sm">Check-in</button>
                <button onClick={() => checkOut(b.booking_id)} className="px-3 py-1 rounded bg-gold text-white text-sm">Check-out</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

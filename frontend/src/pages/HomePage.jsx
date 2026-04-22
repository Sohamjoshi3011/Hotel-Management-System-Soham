import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HotelCard from '../components/HotelCard'
import api from '../services/api'

export default function HomePage() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    api.get('/hotels/').then((res) => setHotels(res.data)).catch(() => setHotels([]))
  }, [])

  return (
    <div>
      <Navbar />
      <section className="h-[360px] relative">
        <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1800" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold">Find Your Perfect Stay</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Hotels</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => <HotelCard key={hotel.hotel_id} hotel={hotel} />)}
        </div>
      </section>

      <footer className="bg-primary text-white text-center py-6 font-medium">
        Book Now - Call {hotels[0]?.phone_number || '+91 98765 43210'}
      </footer>
    </div>
  )
}

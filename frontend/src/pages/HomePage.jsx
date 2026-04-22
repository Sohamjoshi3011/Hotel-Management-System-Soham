import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import HotelCard from '../components/HotelCard'
import api from '../services/api'

const sampleHotels = [
  {
    hotel_id: 's1',
    name: 'Azure Crown Hotel',
    location: 'Goa, India',
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
    price: 5299,
    reviews: 628,
    phone_number: '+91 98310 22441',
  },
  {
    hotel_id: 's2',
    name: 'Emerald Bay Resort',
    location: 'Udaipur, Rajasthan',
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1400&q=80',
    price: 6899,
    reviews: 912,
    phone_number: '+91 98984 56220',
  },
  {
    hotel_id: 's3',
    name: 'Golden Horizon Suites',
    location: 'Mumbai, Maharashtra',
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80',
    price: 7499,
    reviews: 455,
    phone_number: '+91 98110 33227',
  },
  {
    hotel_id: 's4',
    name: 'Skyline Grand Palace',
    location: 'Bengaluru, Karnataka',
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=80',
    price: 5999,
    reviews: 702,
    phone_number: '+91 98450 11883',
  },
]

const benefits = [
  { icon: '🛎️', title: '24/7 Premium Service', text: 'Always-on support for check-in, requests, and concierge help.' },
  { icon: '✨', title: 'Luxury Cleanliness', text: 'Professional housekeeping with strict quality standards.' },
  { icon: '📍', title: 'Prime Locations', text: 'Handpicked hotels near beaches, business hubs, and landmarks.' },
]

const testimonials = [
  { name: 'Riya S.', quote: 'Smooth booking, beautiful room, and the staff were incredibly warm.' },
  { name: 'Ankit M.', quote: 'The dashboard made operations super easy for our team.' },
  { name: 'Neha P.', quote: 'Loved the premium feel and quick check-in process.' },
]

export default function HomePage() {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    api.get('/hotels/')
      .then((res) => {
        const normalized = (res.data || []).map((hotel, index) => ({
          ...sampleHotels[index % sampleHotels.length],
          ...hotel,
          price: hotel.price || sampleHotels[index % sampleHotels.length].price,
          reviews: 300 + index * 47,
          phone_number: hotel.phone_number || sampleHotels[index % sampleHotels.length].phone_number,
          image_url: hotel.image_url || sampleHotels[index % sampleHotels.length].image_url,
        }))
        setHotels(normalized)
      })
      .catch(() => setHotels([]))
  }, [])

  const displayHotels = useMemo(() => (hotels.length ? hotels : sampleHotels), [hotels])

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative h-[78vh] min-h-[520px]">
        <img src="https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=2200&q=80" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/55 to-blue-900/35" />
        <div className="absolute inset-0 container-page flex flex-col justify-center">
          <span className="inline-flex w-fit bg-white/15 text-white px-4 py-1.5 rounded-full mb-5 backdrop-blur">Luxury stays made effortless</span>
          <h1 className="text-white text-5xl md:text-7xl font-bold max-w-3xl leading-tight">Find Your Perfect Stay</h1>
          <p className="text-slate-100/90 mt-6 max-w-xl text-lg">Discover premium hotels, simplified bookings, and seamless management in one modern platform.</p>
          <a href="#hotels" className="mt-8 btn-primary w-fit">Explore Hotels</a>
        </div>
      </section>

      <section id="hotels" className="container-page py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary font-semibold">Featured Collection</p>
            <h2 className="text-3xl md:text-4xl font-bold">Handpicked Hotels</h2>
          </div>
          <p className="text-textGray hidden md:block">Curated comfort for business and leisure</p>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {displayHotels.map((hotel) => <HotelCard key={hotel.hotel_id} hotel={hotel} />)}
        </div>
      </section>

      <section id="why-us" className="container-page pb-20">
        <div className="card p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl p-5 bg-slate-50 border border-slate-100 hover:border-primary/20 transition">
                <p className="text-3xl mb-3">{benefit.icon}</p>
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-sm text-textGray mt-2">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white border-y border-slate-100">
        <div className="container-page py-20">
          <h2 className="text-3xl font-bold mb-8">Guest Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <article key={item.name} className="card p-6">
                <p className="text-gold text-lg">★★★★★</p>
                <p className="mt-3 text-textGray leading-relaxed">“{item.quote}”</p>
                <p className="mt-4 font-semibold">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-200">
        <div className="container-page py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-semibold">RoyalStay Hospitality Platform</p>
          <p className="text-sm">Book Now - Call {displayHotels[0]?.phone_number || '+91 98765 43210'}</p>
        </div>
      </footer>
    </div>
  )
}

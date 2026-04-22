export default function HotelCard({ hotel }) {
  return (
    <article className="card overflow-hidden group hover:-translate-y-1">
      <div className="overflow-hidden">
        <img
          src={hotel.image_url}
          alt={hotel.name}
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{hotel.name}</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600">Top Pick</span>
        </div>
        <p className="text-textGray text-sm">📍 {hotel.location}</p>
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold text-primary">₹{hotel.price}/night</p>
          <p className="text-gold">⭐⭐⭐⭐ <span className="text-textGray">({hotel.reviews})</span></p>
        </div>
        <p className="text-sm text-textGray">Book Now - Call <span className="font-medium text-textDark">{hotel.phone_number}</span></p>
      </div>
    </article>
  )
}

export default function HotelCard({ hotel }) {
  return (
    <article className="card overflow-hidden">
      <img src={hotel.image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900'} alt={hotel.name} className="h-48 w-full object-cover" />
      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <p className="text-textGray">{hotel.location}</p>
        <p className="font-semibold text-primary">From ₹{hotel.base_price || 2999}/night</p>
        <p className="text-gold">★★★★★ <span className="text-textGray text-sm">(412 reviews)</span></p>
        <p className="text-sm text-textGray">Call: {hotel.phone_number || 'N/A'}</p>
      </div>
    </article>
  )
}

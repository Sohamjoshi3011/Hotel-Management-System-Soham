import { Link } from 'react-router-dom'

export default function Navbar() {
  return (

    <header className="sticky top-0 z-40 backdrop-blur-xl border-b border-slate-200/70 bg-white/80">
      <div className="container-page py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-2xl tracking-tight text-primary flex items-center gap-2">
          <span className="text-gold">◆</span> RoyalStay
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          <a href="#hotels" className="hover:text-primary transition">Hotels</a>
          <a href="#why-us" className="hover:text-primary transition">Why Us</a>
          <a href="#testimonials" className="hover:text-primary transition">Reviews</a>
        </div>

        <div className="space-x-3">
          <Link to="/login/admin" className="px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition">Admin Login</Link>
          <Link to="/login/manager" className="btn-emerald">Manager Login</Link>

    <header className="sticky top-0 z-20 backdrop-blur border-b border-slate-200 bg-white/90">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-primary">RoyalStay HMS</Link>
        <div className="space-x-3">
          <Link to="/login/admin" className="px-4 py-2 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white transition">Admin Login</Link>
          <Link to="/login/manager" className="px-4 py-2 rounded-xl bg-emerald text-white hover:opacity-90 transition">Manager Login</Link>

        </div>
      </div>
    </header>
  )
}

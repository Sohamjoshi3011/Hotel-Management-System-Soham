import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
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

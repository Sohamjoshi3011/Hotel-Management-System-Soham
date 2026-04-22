import { Link, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-bgLight">
      <aside className="w-64 bg-white border-r p-5 space-y-3">
        <h2 className="font-bold text-primary text-xl">Manager Panel</h2>
        <nav className="space-y-2 text-sm">
          <Link className="block p-2 rounded hover:bg-slate-100" to="/manager">Overview</Link>
          <Link className="block p-2 rounded hover:bg-slate-100" to="/manager/booking">Booking</Link>
          <Link className="block p-2 rounded hover:bg-slate-100" to="/housekeeping">Housekeeping</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

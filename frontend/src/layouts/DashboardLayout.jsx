import { Link, Outlet, useLocation } from 'react-router-dom'

const links = [
  { to: '/manager', label: 'Overview', icon: '📊' },
  { to: '/manager/booking', label: 'Bookings', icon: '🗓️' },
  { to: '/housekeeping', label: 'Housekeeping', icon: '🧹' },
]

export default function DashboardLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-bgLight">
      <aside className="w-72 bg-[#102A66] text-blue-50 p-6 space-y-8 shadow-2xl shadow-blue-950/20">
        <div>
          <p className="text-blue-200 text-sm">RoyalStay</p>
          <h2 className="font-bold text-2xl">Manager Panel</h2>
        </div>

        <nav className="space-y-2 text-sm">
          {links.map((link) => {
            const active = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 rounded-xl p-3 transition ${active ? 'bg-white text-[#102A66] shadow-lg' : 'text-blue-100 hover:bg-blue-800/70'}`}
              >
                <span>{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8">
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex justify-between items-center">
          <h1 className="text-xl font-bold text-textDark">Operations Dashboard</h1>
          <p className="text-sm text-textGray">Manage rooms, bookings & teams</p>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import AdminPage from './pages/AdminPage'
import BookingPage from './pages/BookingPage'
import HomePage from './pages/HomePage'
import HousekeepingPage from './pages/HousekeepingPage'
import LoginPage from './pages/LoginPage'
import ManagerDashboard from './pages/ManagerDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route element={<DashboardLayout />}>
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/manager/booking" element={<BookingPage />} />
      </Route>
      <Route path="/housekeeping" element={<HousekeepingPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

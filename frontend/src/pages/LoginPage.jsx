import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'

export default function LoginPage() {
  const { role } = useParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const body = new URLSearchParams({ username: email, password })
      const res = await api.post('/login', body)
      localStorage.setItem('token', res.data.access_token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('userName', res.data.name)
      if ((res.data.role || '').includes('MANAGER')) navigate('/manager')
      else if ((res.data.role || '').includes('ADMIN')) navigate('/admin')
      else navigate('/housekeeping')
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen relative grid place-items-center px-4 py-10">
      <img
        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1800&q=80"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-slate-900/50 to-emerald-900/45" />

      <form onSubmit={submit} className="relative w-full max-w-md rounded-3xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-[0_20px_80px_rgba(15,23,42,0.35)] p-8 space-y-5 text-white">
        <div>
          <p className="text-white/80 text-sm">Welcome back</p>
          <h1 className="text-3xl font-bold mt-1">{role?.toUpperCase()} Login</h1>
        </div>

        <div className="space-y-3">
          <input
            className="w-full rounded-xl px-4 py-3 bg-white/90 text-slate-800 placeholder:text-slate-400 outline-none border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/25 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl px-4 py-3 bg-white/90 text-slate-800 placeholder:text-slate-400 outline-none border border-transparent focus:border-primary focus:ring-4 focus:ring-primary/25 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-rose-200 text-sm">{error}</p>}

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-emerald text-white font-semibold shadow-lg shadow-blue-950/35 hover:scale-[1.01] hover:-translate-y-0.5 transition">Sign In Securely</button>
      </form>
    </div>
  )
}

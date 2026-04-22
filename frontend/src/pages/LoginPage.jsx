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
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="card p-7 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">{role?.toUpperCase()} Login</h1>
        <input className="w-full border rounded-xl p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded-xl p-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full bg-primary text-white py-3 rounded-xl hover:opacity-90">Login</button>
      </form>
    </div>
  )
}

import { useEffect, useState } from 'react'
import api from '../services/api'

export default function HousekeepingPage() {
  const [tasks, setTasks] = useState([])
  const [message, setMessage] = useState('')

  const load = async () => {
    try {
      const res = await api.get('/housekeeping/tasks')
      setTasks(res.data || [])
    } catch (err) {
      setMessage(`❌ ${err.message}`)
      setTasks([])
    }
  }

  useEffect(() => {
    load()
  }, [])

  const complete = async (id) => {
    try {
      await api.post(`/housekeeping/tasks/${id}/complete`)
      setMessage('✅ Task marked complete')
      load()
    } catch (err) {
      setMessage(`❌ ${err.message}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Housekeeping Tasks</h1>
      {message && <p className="mb-3 text-sm">{message}</p>}
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.task_id} className="card p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Room #{t.room_id}</p>
              <p className="text-sm text-textGray">{t.notes || 'No notes'}</p>
            </div>
            <button type="button" onClick={() => complete(t.task_id)} className="bg-emerald text-white rounded px-4 py-2">Mark Complete</button>
          </div>
        ))}
        {!tasks.length && <p className="text-sm text-textGray">No pending tasks.</p>}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import api from '../services/api'

export default function HousekeepingPage() {
  const [tasks, setTasks] = useState([])

  const load = () => api.get('/housekeeping/tasks').then((res) => setTasks(res.data))
  useEffect(() => { load() }, [])

  const complete = async (id) => {
    await api.post(`/housekeeping/tasks/${id}/complete`)
    load()
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Housekeeping Tasks</h1>
      <div className="space-y-3">
        {tasks.map((t) => (
          <div key={t.task_id} className="card p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Room #{t.room_id}</p>
              <p className="text-sm text-textGray">{t.notes}</p>
            </div>
            <button onClick={() => complete(t.task_id)} className="bg-emerald text-white rounded px-4 py-2">Mark Complete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

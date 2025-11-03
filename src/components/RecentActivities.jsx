import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function formatRange(a) {
  if (!a.end_time) return 'In progress'
  const start = new Date(a.start_time)
  const end = new Date(a.end_time)
  return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
}

function formatDuration(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.round((sec % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default function RecentActivities() {
  const [items, setItems] = useState([])

  const fetchItems = async () => {
    const res = await fetch(`${API_BASE}/api/activities`)
    const data = await res.json()
    // newest first
    data.sort((a, b) => (a.start_time < b.start_time ? 1 : -1))
    setItems(data.slice(0, 8))
  }

  useEffect(() => {
    fetchItems()
    const t = setInterval(fetchItems, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
      <div className="space-y-2">
        <AnimatePresence>
          {items.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
            >
              <div className="text-sm text-gray-700">
                <div className="font-medium">{a.activity_category} • {a.activity_name}</div>
                <div className="text-gray-500">{formatRange(a)}</div>
              </div>
              <div className="text-sm font-medium text-gray-800">
                {a.duration_seconds ? formatDuration(a.duration_seconds) : '—'}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

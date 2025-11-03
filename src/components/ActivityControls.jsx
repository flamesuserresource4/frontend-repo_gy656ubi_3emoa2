import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, Square, ChevronDown } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ActivityControls() {
  const [types, setTypes] = useState([])
  const [active, setActive] = useState(null)
  const [selCat, setSelCat] = useState('')
  const [selName, setSelName] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchTypes = async () => {
    const res = await fetch(`${API_BASE}/api/activity-types`)
    setTypes(await res.json())
  }
  const fetchActive = async () => {
    const res = await fetch(`${API_BASE}/api/activities/active`)
    setActive(await res.json())
  }

  useEffect(() => {
    fetchTypes()
    fetchActive()
  }, [])

  const categories = useMemo(() => Array.from(new Set(types.map(t => t.activity_category))), [types])
  const namesForCategory = useMemo(() => types.filter(t => t.activity_category === selCat).map(t => t.activity_name), [types, selCat])

  const start = async () => {
    if (!selCat || !selName) {
      alert('Please select category and name')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/activities/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activity_category: selCat, activity_name: selName }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to start')
      }
      setSelCat('')
      setSelName('')
      await fetchActive()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  const end = async () => {
    if (!active) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/activities/end`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: active.id }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to end activity')
      }
      await fetchActive()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Activity</h2>

      {!active ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <select
              value={selCat}
              onChange={(e) => setSelCat(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <div className="relative">
            <select
              value={selName}
              onChange={(e) => setSelName(e.target.value)}
              disabled={!selCat}
              className="w-full appearance-none rounded-lg border border-gray-200 px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-50"
            >
              <option value="">Select activity</option>
              {namesForCategory.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={start}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition"
          >
            <PlayCircle size={20} /> Start Activity Now
          </motion.button>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-gray-700">
            <div className="text-sm">Current Activity</div>
            <div className="font-medium">
              {active.activity_category} • {active.activity_name}
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={end}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 text-white px-4 py-2 font-medium hover:bg-rose-700 transition"
          >
            <Square size={20} /> End Activity {active.activity_name} Now
          </motion.button>
        </div>
      )}
    </div>
  )
}

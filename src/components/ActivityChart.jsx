import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const COLORS = [
  '#6366F1', // indigo
  '#22C55E', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#06B6D4', // cyan
  '#A855F7', // purple
]

function secondsToHhMm(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default function ActivityChart() {
  const [summary, setSummary] = useState({ dates: [], data: {} })

  const fetchSummary = async () => {
    const res = await fetch(`${API_BASE}/api/summary`)
    const data = await res.json()
    setSummary(data)
  }

  useEffect(() => {
    fetchSummary()
    const t = setInterval(fetchSummary, 5000)
    return () => clearInterval(t)
  }, [])

  const categories = useMemo(() => {
    const cats = new Set()
    for (const d of summary.dates) {
      const row = summary.data[d] || {}
      Object.keys(row).forEach((c) => cats.add(c))
    }
    return Array.from(cats)
  }, [summary])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Daily Overview</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c, i) => (
            <div key={c} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="text-gray-600">{c}</span>
            </div>
          ))}
        </div>
      </div>

      {summary.dates.length === 0 ? (
        <div className="text-sm text-gray-500">No completed activities yet. Start one to see insights.</div>
      ) : (
        <div className="space-y-4">
          {summary.dates.map((date, di) => {
            const row = summary.data[date] || {}
            const total = Object.values(row).reduce((a, b) => a + b, 0)
            return (
              <div key={date} className="">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">{date}</div>
                  <div className="text-xs text-gray-500">{secondsToHhMm(total)}</div>
                </div>
                <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="flex h-full w-full">
                    {categories.map((c, i) => {
                      const val = row[c] || 0
                      const width = total > 0 ? (val / total) * 100 : 0
                      return (
                        <motion.div
                          key={c}
                          className="h-full"
                          style={{ background: COLORS[i % COLORS.length], width: `${width}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ duration: 0.6 }}
                          title={`${c}: ${secondsToHhMm(val)}`}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

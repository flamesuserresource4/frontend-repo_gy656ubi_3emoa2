import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Edit3, Save } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ActivityTypeManager() {
  const [types, setTypes] = useState([])
  const [form, setForm] = useState({ activity_category: '', activity_name: '' })
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchTypes = async () => {
    const res = await fetch(`${API_BASE}/api/activity-types`)
    const data = await res.json()
    setTypes(data)
  }

  useEffect(() => {
    fetchTypes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.activity_category || !form.activity_name) return
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/activity-types`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Failed to create type')
      }
      setForm({ activity_category: '', activity_name: '' })
      await fetchTypes()
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this activity type?')) return
    await fetch(`${API_BASE}/api/activity-types/${id}`, { method: 'DELETE' })
    await fetchTypes()
  }

  const startEdit = (t) => {
    setEditingId(t.id)
    setForm({ activity_category: t.activity_category, activity_name: t.activity_name })
  }
  const saveEdit = async () => {
    if (!editingId) return
    const res = await fetch(`${API_BASE}/api/activity-types/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      alert(err.detail || 'Update failed')
    }
    setEditingId(null)
    setForm({ activity_category: '', activity_name: '' })
    await fetchTypes()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Activity Types</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <input
          className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Category (e.g., sports)"
          value={form.activity_category}
          onChange={(e) => setForm((f) => ({ ...f, activity_category: e.target.value }))}
        />
        <input
          className="rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Name (e.g., jogging)"
          value={form.activity_name}
          onChange={(e) => setForm((f) => ({ ...f, activity_name: e.target.value }))}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition"
        >
          <Plus size={18} /> Add Type
        </button>
      </form>

      <ul className="space-y-2">
        <AnimatePresence>
          {types.map((t) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
            >
              <div className="text-sm text-gray-700">
                <span className="font-medium">{t.activity_category}</span>
                <span className="mx-2">•</span>
                <span>{t.activity_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => startEdit(t)}
                  title="Edit"
                >
                  <Edit3 size={18} className="text-gray-600" />
                </button>
                <button
                  className="p-2 rounded-md hover:bg-red-50"
                  onClick={() => handleDelete(t.id)}
                  title="Delete"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {editingId && (
        <div className="mt-4 flex items-center gap-2">
          <div className="text-sm text-gray-600">Editing…</div>
          <button
            onClick={saveEdit}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-sm hover:bg-emerald-700"
          >
            <Save size={16} /> Save Changes
          </button>
          <button
            onClick={() => { setEditingId(null); setForm({ activity_category: '', activity_name: '' }) }}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}

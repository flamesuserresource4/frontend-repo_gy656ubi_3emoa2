import { motion } from 'framer-motion'
import { Activity, Timer, BarChart3 } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white p-6 sm:p-8 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Activity Tracker</h1>
          <p className="mt-1 text-sm sm:text-base text-white/90">
            Track your time across categories with a clean, animated dashboard.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-2 backdrop-blur">
            <Activity size={18} />
            <span className="text-sm">Types</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-2 backdrop-blur">
            <Timer size={18} />
            <span className="text-sm">Sessions</span>
          </div>
          <div className="flex items-center gap-2 bg-white/15 rounded-full px-3 py-2 backdrop-blur">
            <BarChart3 size={18} />
            <span className="text-sm">Insights</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute -left-12 -bottom-10 h-32 w-32 rounded-full bg-fuchsia-300/30 blur-2xl" />
      </motion.div>
    </div>
  )
}

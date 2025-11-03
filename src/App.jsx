import DashboardHeader from './components/DashboardHeader'
import ActivityTypeManager from './components/ActivityTypeManager'
import ActivityControls from './components/ActivityControls'
import ActivityChart from './components/ActivityChart'
import RecentActivities from './components/RecentActivities'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ActivityChart />
            <ActivityControls />
          </div>
          <div className="space-y-6">
            <ActivityTypeManager />
            <RecentActivities />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

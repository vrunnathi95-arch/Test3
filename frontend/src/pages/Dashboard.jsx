import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { StatCard } from '../components/StatCard'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { EmptyState } from '../components/EmptyState'
import { dashboardService } from '../services/dashboardService'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [statistics, setStatistics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const data = await dashboardService.getStatistics()
      setStatistics(data)
      setError(null)
    } catch (err) {
      setError('Failed to load dashboard statistics')
    } finally {
      setLoading(false)
    }
  }

  const StatCardIcon = ({ type }) => {
    const icons = {
      total: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
      pending: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      inProgress: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      completed: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
      overdue: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    }
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icons[type]}
      </svg>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-8">
            <EmptyState
              title="Error Loading Dashboard"
              description={error}
              action={<button onClick={loadStatistics} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Try Again</button>}
            />
          </main>
        </div>
      </div>
    )
  }

  if (!statistics) {
    return <EmptyState
      title="No Statistics Available"
      description="No data available yet. Create some tasks to see your dashboard statistics."
    />
  }

  const completionRate = statistics.total > 0 
    ? Math.round((statistics.completed / statistics.total) * 100) 
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <StatCard
                title="Total Tasks"
                value={statistics.total || 0}
                icon={<StatCardIcon type="total" />}
                color="blue"
              />
              <StatCard
                title="Pending"
                value={statistics.pending || 0}
                icon={<StatCardIcon type="pending" />}
                color="yellow"
              />
              <StatCard
                title="In Progress"
                value={statistics.in_progress || 0}
                icon={<StatCardIcon type="inProgress" />}
                color="purple"
              />
              <StatCard
                title="Completed"
                value={statistics.completed || 0}
                icon={<StatCardIcon type="completed" />}
                color="green"
              />
              <StatCard
                title="Overdue"
                value={statistics.overdue || 0}
                icon={<StatCardIcon type="overdue" />}
                color="red"
              />
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="text-xl font-semibold text-gray-900">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
                {statistics.priority_breakdown ? (
                  <div className="space-y-2">
                    {Object.entries(statistics.priority_breakdown).map(([priority, count]) => (
                      <div key={priority} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">{priority}</span>
                        <span className="font-medium text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No priority data available</p>
                )}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
                {statistics.category_breakdown ? (
                  <div className="space-y-2">
                    {Object.entries(statistics.category_breakdown).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">{category}</span>
                        <span className="font-medium text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No category data available</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Actions</h3>
              <p className="text-blue-700 mb-4">Manage your academic tasks efficiently</p>
              <Link
                to="/tasks"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Tasks
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
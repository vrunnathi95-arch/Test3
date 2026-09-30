export function StatCard({ title, value, icon, color = 'bg-white' }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  }

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.blue} bg-opacity-10`}>
          <svg className={`w-6 h-6 ${iconColors[color] || iconColors.blue}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        {value !== undefined && (
          <span className="text-3xl font-semibold text-gray-900">{value}</span>
        )}
      </div>
      <p className="text-gray-600 font-medium">{title}</p>
    </div>
  )
}
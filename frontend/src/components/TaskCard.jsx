import { useState } from 'react'

export function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const [showMenu, setShowMenu] = useState(false)

  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  }

  const statusColors = {
    Pending: 'bg-gray-100 text-gray-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    Completed: 'bg-green-100 text-green-800',
  }

  const getCategoryColor = (category) => {
    const colors = {
      Assignment: 'bg-purple-100 text-purple-800',
      Exam: 'bg-red-100 text-red-800',
      Project: 'bg-blue-100 text-blue-800',
      Study: 'bg-green-100 text-green-800',
      Personal: 'bg-orange-100 text-orange-800',
      Other: 'bg-gray-100 text-gray-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'Completed'

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm transition-shadow hover:shadow-md ${isOverdue ? 'border-red-300 bg-red-50' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
          {task.category}
        </span>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
            </svg>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => { onEdit(task); setShowMenu(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => { onDelete(task.id); setShowMenu(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {task.due_date && (
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              Due: {new Date(task.due_date).toLocaleDateString()}
              {isOverdue && ' (Overdue)'}
            </span>
          )}
        </div>
        {task.status !== 'Completed' && (
          <button
            onClick={() => onToggleStatus(task.id, 'Completed')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  )
}
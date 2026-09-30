import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { TaskCard } from '../components/TaskCard'
import { TaskForm } from '../components/TaskForm'
import { TaskFilter } from '../components/TaskFilter'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { EmptyState } from '../components/EmptyState'
import { taskService } from '../services/taskService'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTaskId, setDeletingTaskId] = useState(null)
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    category: '',
  })

  useEffect(() => {
    loadTasks()
  }, [])

  useEffect(() => {
    filterTasks()
  }, [tasks, filters])

  const loadTasks = async () => {
    try {
      const data = await taskService.getAllTasks()
      setTasks(data)
      setError(null)
    } catch (err) {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const filterTasks = () => {
    let result = [...tasks]

    if (filters.search) {
      result = result.filter(task => 
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.status) {
      result = result.filter(task => task.status === filters.status)
    }

    if (filters.priority) {
      result = result.filter(task => task.priority === filters.priority)
    }

    if (filters.category) {
      result = result.filter(task => task.category === filters.category)
    }

    setFilteredTasks(result)
  }

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks(prev => [newTask, ...prev])
      setShowForm(false)
    } catch (err) {
      setError('Failed to create task')
    }
  }

  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskService.updateTask(editingTask.id, taskData)
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ))
      setEditingTask(null)
      setShowForm(false)
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const handleDeleteTask = async () => {
    try {
      await taskService.deleteTask(deletingTaskId)
      setTasks(prev => prev.filter(task => task.id !== deletingTaskId))
      setDeletingTaskId(null)
      setConfirmDialogOpen(false)
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  const handleToggleStatus = async (taskId, status) => {
    try {
      const updatedTask = await taskService.updateTaskStatus(taskId, status)
      setTasks(prev => prev.map(task => 
        task.id === taskId ? updatedTask : task
      ))
    } catch (err) {
      setError('Failed to update task status')
    }
  }

  const openEditForm = (task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
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
              title="Error Loading Tasks"
              description={error}
              action={<button onClick={loadTasks} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Try Again</button>}
            />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
              <button
                onClick={() => { setEditingTask(null); setShowForm(true); }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Task
              </button>
            </div>

            <TaskFilter filters={filters} onFilterChange={handleFilterChange} />

            {filteredTasks.length === 0 ? (
              <EmptyState
                title="No Tasks Found"
                description={
                  filters.search || filters.status || filters.priority || filters.category
                    ? "No tasks match your current filters. Try adjusting your filters."
                    : "You haven't created any tasks yet. Get started by adding your first task!"
                }
                action={
                  <button
                    onClick={() => { setEditingTask(null); setShowForm(true); }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Create Your First Task
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={openEditForm}
                    onDelete={(id) => {
                      setDeletingTaskId(id)
                      setConfirmDialogOpen(true)
                    }}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <button
                  onClick={() => { setShowForm(false); setEditingTask(null); }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={() => { setShowForm(false); setEditingTask(null); }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={confirmDialogOpen}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDeleteTask}
        onCancel={() => {
          setConfirmDialogOpen(false)
          setDeletingTaskId(null)
        }}
      />
    </div>
  )
}
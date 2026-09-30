export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Student Task Manager
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">Guest User</span>
        </div>
      </div>
    </nav>
  )
}
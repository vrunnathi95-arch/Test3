import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { useAuth } from '../context/authContext'
import { LoadingSpinner } from '../components/LoadingSpinner'

export default function Profile() {
  const { user, token } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [user])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Not authenticated</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl font-bold text-blue-600">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.full_name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-gray-500">Full Name</dt>
                      <dd className="text-gray-900 font-medium">{user.full_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Email Address</dt>
                      <dd className="text-gray-900 font-medium">{user.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Member Since</dt>
                      <dd className="text-gray-900 font-medium">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Information</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-gray-500">Authentication Token</dt>
                      <dd className="text-gray-900 font-medium font-mono text-sm break-all truncate">
                        {token ? `${token.substring(0, 30)}...` : 'N/A'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Account Status</dt>
                      <dd className="text-green-600 font-medium">Active</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
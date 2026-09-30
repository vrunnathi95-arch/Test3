import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { LoadingSpinner } from './LoadingSpinner'

export function ProtectedRoute({ children }) {
  const { token, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      authService.setHeader(token)
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    const response = await authService.login({ email, password })
    localStorage.setItem('token', response.token)
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    localStorage.setItem('token', response.token)
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    authService.removeHeader()
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
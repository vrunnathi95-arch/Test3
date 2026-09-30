import api from './api'

export const authService = {
  async register(userData) {
    console.log('Registering user with:', { email: userData.email, full_name: userData.full_name })
    const response = await api.post('/auth/register', userData)
    console.log('Registration response:', response.data)
    return response.data
  },

  async login(credentials) {
    console.log('Logging in with:', { email: credentials.email })
    const response = await api.post('/auth/login', credentials)
    console.log('Login response:', response.data)
    return response.data
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data
  },

  setHeader(token) {
    // Token is passed via query params in api.js interceptor, not headers
    // This is kept for API compatibility but not used
  },

  removeHeader() {
    // Token is passed via query params, so no header to remove
  },
}
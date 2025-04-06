import axios from 'axios'

// Use the environment variable for API URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

const getTokenWithExpiry = () => {
  const token = localStorage.getItem('auth_token')
  const expiryStr = localStorage.getItem('auth_token_expiry')
  
  if (!token || !expiryStr) {
    return null
  }

  const expiryDate = new Date(expiryStr)
  if (expiryDate < new Date()) {
    // Token has expired
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_token_expiry')
    return null
  }

  return token
}

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = getTokenWithExpiry()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
) 
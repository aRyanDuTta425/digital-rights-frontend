import axios from 'axios'

// Helper function to safely access localStorage
const getLocalStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

// Use the environment variable for API URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getTokenWithExpiry = () => {
  if (typeof window === 'undefined') return null
  
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

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getLocalStorage('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeLocalStorage('auth_token')
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
) 
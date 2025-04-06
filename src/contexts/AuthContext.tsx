'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/api/config'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'auth_token'
const TOKEN_EXPIRY_KEY = 'auth_token_expiry'

const setTokenWithExpiry = (token: string) => {
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 7) // Set expiry to 7 days from now
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryDate.toISOString())
}

const getTokenWithExpiry = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY)
  
  if (!token || !expiryStr) {
    return null
  }

  const expiryDate = new Date(expiryStr)
  if (expiryDate < new Date()) {
    // Token has expired
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(TOKEN_EXPIRY_KEY)
    return null
  }

  return token
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getTokenWithExpiry()
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/me')
      setUser(response.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
      delete api.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email, password })
      const { token, user } = response.data
      setTokenWithExpiry(token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      setIsAuthenticated(true)
    } catch (error: any) {
      console.error('Login error:', error)
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error)
      }
      throw new Error('Failed to login. Please try again.')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    console.log('=== AuthContext: Starting Registration ===')
    try {
      console.log('1. Preparing registration request...')
      const response = await api.post('/api/auth/register', { name, email, password })
      console.log('2. Registration API response received:', {
        status: response.status,
        hasToken: !!response.data.token,
        hasUser: !!response.data.user
      })

      const { token, user } = response.data
      console.log('3. Setting up authentication...')
      
      setTokenWithExpiry(token)
      console.log('4. Token stored with expiry')
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      console.log('5. Authorization header set')
      
      setUser(user)
      setIsAuthenticated(true)
      console.log('6. User state updated:', {
        userId: user.id,
        email: user.email,
        name: user.name
      })
      
      console.log('✅ Registration completed successfully')
    } catch (error: any) {
      console.error('❌ Registration failed in AuthContext:', error)
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      })
      
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error)
      }
      throw new Error('Failed to register. Please try again.')
    } finally {
      console.log('=== AuthContext: Registration Process Completed ===')
    }
  }

  const logout = async () => {
    try {
      await api.post('/api/auth/logout')
    } catch (error) {
      console.error('Failed to logout:', error)
    } finally {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
      delete api.defaults.headers.common['Authorization']
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
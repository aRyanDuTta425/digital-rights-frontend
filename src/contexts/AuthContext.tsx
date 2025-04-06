'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/storage'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getLocalStorage('auth_token')
    if (token) {
      // TODO: Validate token and get user info
      setUser({
        id: '1',
        name: 'Test User',
        email: 'test@example.com'
      })
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // TODO: Implement actual login API call
      const token = 'dummy_token'
      setLocalStorage('auth_token', token)
      setUser({
        id: '1',
        name: 'Test User',
        email: email
      })
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // TODO: Implement actual registration API call
      const token = 'dummy_token'
      setLocalStorage('auth_token', token)
      setUser({
        id: '1',
        name: name,
        email: email
      })
    } catch (error) {
      throw new Error('Registration failed')
    }
  }

  const logout = () => {
    removeLocalStorage('auth_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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
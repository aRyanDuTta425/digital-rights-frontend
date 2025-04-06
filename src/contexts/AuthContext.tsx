'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { login as loginApi, register as registerApi } from '@/api/auth'
import { withClientOnly } from '@/components/ClientOnly'

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

function AuthProviderComponent({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('user')
        }
      }
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password)
      const userData = response.data.user
      setUser(userData)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await registerApi(name, email, password)
      const userData = response.data.user
      setUser(userData)
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export a client-only version of the AuthProvider
export const AuthProvider = withClientOnly(AuthProviderComponent)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
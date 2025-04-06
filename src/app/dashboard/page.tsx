'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your digital content and licenses here.
          </p>
        </div>
      </div>
    </div>
  )
} 
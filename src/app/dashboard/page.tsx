'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Content Check</h2>
            <p className="text-gray-600 mb-4">
              Analyze your content for potential copyright issues and get recommendations.
            </p>
            <a
              href="/content-check"
              className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Start Check
            </a>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Legal Chat</h2>
            <p className="text-gray-600 mb-4">
              Get instant answers to your legal questions about copyright and licensing.
            </p>
            <a
              href="/chat"
              className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Start Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 
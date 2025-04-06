'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import ClientOnly from '@/components/ClientOnly'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user.name}!</h1>
              <p className="mt-1 text-sm text-gray-500">{user.email}</p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Link
                  href="/content-check"
                  className="block p-6 bg-white border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-gray-900">Content Check</h2>
                  <p className="mt-2 text-gray-600">Verify if your content has been used without permission</p>
                </Link>

                <Link
                  href="/chat"
                  className="block p-6 bg-white border rounded-lg hover:border-primary-500 transition-colors"
                >
                  <h2 className="text-xl font-semibold text-gray-900">Legal Chat</h2>
                  <p className="mt-2 text-gray-600">Get instant legal advice about your digital rights</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
} 
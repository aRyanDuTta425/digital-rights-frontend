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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ClientOnly>
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Welcome, {user.name}!
            </h1>
            <p className="mt-3 text-xl text-muted-foreground sm:mt-4">
              {user.email}
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Link
              href="/content-check"
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="card-header">
                <h2 className="card-title">Content Check</h2>
                <p className="card-description">
                  Check your content for potential copyright issues.
                </p>
              </div>
            </Link>

            <Link
              href="/legal-chat"
              className="card hover:shadow-lg transition-shadow"
            >
              <div className="card-header">
                <h2 className="card-title">Legal Chat</h2>
                <p className="card-description">
                  Chat with our AI about legal questions.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
} 
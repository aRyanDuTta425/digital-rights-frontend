'use client'

import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import ClientOnly from '@/components/ClientOnly'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <ClientOnly>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl">
              Welcome to Digital Rights Manager
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Protect your digital content and get legal advice about your rights.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {user ? (
                <Link
                  href="/dashboard"
                  className="btn btn-primary"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <div className="space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/login"
                    className="btn btn-primary"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="btn btn-secondary"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
} 
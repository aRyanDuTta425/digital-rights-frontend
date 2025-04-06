'use client'

import Link from 'next/link'
import ClientOnly from '@/components/ClientOnly'

export default function HomePage() {
  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Digital Rights</h1>
          <p className="text-xl text-gray-600">
            Protect your digital content and get legal advice
          </p>
          <div className="mt-8 space-y-4">
            <Link
              href="/login"
              className="w-full inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-full inline-flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
} 
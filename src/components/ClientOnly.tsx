'use client'

import { useEffect, useState, ReactNode } from 'react'
import dynamic from 'next/dynamic'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Helper function to create a client-only component
export function withClientOnly<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
    loading: () => <>{fallback}</>,
  })
} 
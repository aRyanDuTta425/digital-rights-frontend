'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Digital Rights</h1>
        <p className="text-xl text-center mb-12">Your platform for content rights management and legal assistance</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg hover:border-blue-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Content Check</h2>
            <p className="mb-4">Verify if your content has been used without permission</p>
            <Link href="/content-check" className="text-blue-500 hover:underline">
              Check Content →
            </Link>
          </div>
          
          <div className="p-6 border rounded-lg hover:border-blue-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-4">Legal Chat</h2>
            <p className="mb-4">Get instant legal advice about your digital rights</p>
            <Link href="/chat" className="text-blue-500 hover:underline">
              Start Chat →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 
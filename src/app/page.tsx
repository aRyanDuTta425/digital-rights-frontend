import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Digital Rights</h1>
      <p className="text-lg text-gray-600 mb-8">
        Protect your content with AI-powered copyright and licensing analysis.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Content Check</h2>
          <p className="text-gray-600 mb-4">
            Analyze your content for potential copyright issues and get recommendations.
          </p>
          <Link
            href="/check"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Check Content
          </Link>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Legal Chat</h2>
          <p className="text-gray-600 mb-4">
            Get instant answers to your legal questions about copyright and licensing.
          </p>
          <Link
            href="/chat"
            className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Start Chat
          </Link>
        </div>
      </div>
    </main>
  )
} 
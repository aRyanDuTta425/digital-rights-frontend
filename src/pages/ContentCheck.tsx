import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Shield } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { checkContent } from '@/api/content-check'
import { useToast } from '@/components/ui/use-toast'

export default function ContentCheck() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [content, setContent] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsAnalyzing(true)
    try {
      await checkContent(content)
      toast({
        title: 'Content Check Complete',
        description: 'Your content has been analyzed for licensing implications.',
      })
      queryClient.invalidateQueries({ queryKey: ['contentChecks'] })
      navigate('/dashboard')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze content. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Content Licensing Check
          </CardTitle>
          <CardDescription>
            Analyze your content for potential licensing implications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content to Analyze</Label>
              <Textarea
                id="content"
                placeholder="Paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px]"
              />
            </div>
            <Button type="submit" disabled={isAnalyzing || !content.trim()}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Analyze Content'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 
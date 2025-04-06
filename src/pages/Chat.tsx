import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { Send, Loader2 } from 'lucide-react'
import { api } from '@/api/config'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'

interface Message {
  id: string
  answer: string
  confidence: number
  sources: string[]
  timestamp: string
  question?: string
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to access the chat.',
        variant: 'destructive',
      })
      navigate('/login')
    }
  }, [isAuthenticated, isAuthLoading, navigate, toast])

  const { data: messages, error: historyError, isLoading: isHistoryLoading } = useQuery<Message[]>({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      console.log('Fetching chat history...');
      const response = await api.get('/api/chat/history');
      console.log('Chat history response:', response.data);
      return response.data;
    },
    enabled: isAuthenticated && !isAuthLoading,
  })

  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      console.log('Sending message:', { question: message });
      const response = await api.post('/api/chat/message', { question: message });
      console.log('Response:', response.data);
      return { ...response.data, question: message };
    },
    onSuccess: (newMessage) => {
      console.log('Message sent successfully:', newMessage);
      queryClient.setQueryData<Message[]>(['chatHistory'], (oldMessages = []) => {
        return [...oldMessages, newMessage];
      });
      setInput('');
      setIsLoading(false);
    },
    onError: (error: any) => {
      console.error('Failed to send message:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    },
  })

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await sendMessageMutation.mutateAsync(input);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  if (isAuthLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Legal Q&A Chat</h1>
          <p className="text-muted-foreground">
            Ask questions about copyright laws and licensing
          </p>
        </div>
        <Card className="p-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null;
  }

  if (historyError) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Legal Q&A Chat</h1>
          <p className="text-muted-foreground">
            Ask questions about copyright laws and licensing
          </p>
        </div>
        <Card className="p-4">
          <p className="text-red-500">Failed to load chat history. Please try refreshing the page.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Legal Q&A Chat</h1>
        <p className="text-muted-foreground">
          Ask questions about copyright laws and licensing
        </p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 p-4"
        >
          <div className="space-y-4">
            {isHistoryLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              messages?.map((message) => (
                <div
                  key={message.id}
                  className="space-y-4"
                >
                  {message.question && (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-lg p-4 bg-primary text-primary-foreground">
                        <p className="text-sm">{message.question}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                      <p className="text-sm">{message.answer}</p>
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-2 text-xs">
                          <p className="font-medium">Sources:</p>
                          <ul className="list-disc list-inside">
                            {message.sources.map((source, index) => (
                              <li key={index}>{source}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <p className="text-xs mt-2 opacity-70">
                        Confidence: {Math.round(message.confidence * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
} 
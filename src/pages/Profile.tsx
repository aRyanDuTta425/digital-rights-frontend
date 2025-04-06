import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, User, Mail, Lock, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useToast } from '@/components/ui/use-toast'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await logout()
      navigate('/login')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your account settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Input value={user?.name || ''} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input value={user?.email || ''} disabled />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <Input type="password" value="********" disabled />
              </div>
            </div>
            <div className="pt-4">
              <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Logout
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
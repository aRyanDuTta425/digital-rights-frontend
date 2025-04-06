import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/Layout'
import PrivateRoute from '@/components/PrivateRoute'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import ContentCheck from '@/pages/ContentCheck'
import Chat from '@/pages/Chat'
import Profile from './pages/Profile'
import { ThemeProvider } from '@/components/theme-provider'

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="digital-rights-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/check"
              element={
                <PrivateRoute>
                  <ContentCheck />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Toaster />
        </Layout>
      </Router>
    </ThemeProvider>
  )
} 
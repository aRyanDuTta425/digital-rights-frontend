import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@/components/theme-provider'

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="digital-rights-theme">
      <Layout>
        {children}
        <Toaster />
      </Layout>
    </ThemeProvider>
  )
} 
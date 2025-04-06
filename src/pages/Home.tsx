import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Shield, FileText, MessageSquare, BarChart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
          >
            <Shield className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Protect Your Digital Content
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            AI-powered copyright and licensing analysis to ensure your content is protected and compliant.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200">
                Get Started
              </Button>
            </Link>
            <Link to="/check">
              <Button variant="outline" size="lg" className="hover:bg-primary/10 transition-all duration-200">
                Try Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              icon: <Shield className="h-8 w-8 text-primary" />,
              title: "AI-Powered Licensing Check",
              description: "Advanced AI algorithms analyze your content for copyright and licensing issues."
            },
            {
              icon: <FileText className="h-8 w-8 text-primary" />,
              title: "Comprehensive Analysis",
              description: "Detailed reports on copyright status, licensing requirements, and potential risks."
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-primary" />,
              title: "Legal Q&A Chatbot",
              description: "Get instant answers to your copyright and licensing questions."
            },
            {
              icon: <BarChart className="h-8 w-8 text-primary" />,
              title: "Risk Assessment",
              description: "Identify potential legal risks and get recommendations for mitigation."
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative p-6 rounded-2xl border bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-200">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-all duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl blur-xl" />
            <div className="relative p-8 rounded-2xl border bg-card/50 backdrop-blur-sm">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Ready to protect your content?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start your free trial today and get comprehensive copyright protection.
              </p>
              <div className="mt-8">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
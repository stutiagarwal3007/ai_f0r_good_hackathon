"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Activity, Users, TrendingUp, Zap, Heart, Brain, Smartphone, MapPin } from "lucide-react"
import { Shield } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const stats = [
  { label: "Lives Saved", value: "50K+", icon: Heart },
  { label: "Blood Banks", value: "200+", icon: Activity },
  { label: "Active Donors", value: "25K+", icon: Users },
  { label: "Prediction Accuracy", value: "94%", icon: TrendingUp },
]

const features = [
  {
    icon: Brain,
    title: "AI Predictive Analytics",
    description: "Multi-source machine learning using climate, demographics, and social event data",
  },
  {
    icon: Smartphone,
    title: "Geofenced Donor Alerts",
    description: "AR-guided navigation with real-time wait times and location-based notifications",
  },
  {
    icon: Shield,
    title: "Blockchain Credentialing",
    description: "Cryptographic health profiles with instant verification and peer reviews",
  },
  {
    icon: MapPin,
    title: "Regional Intelligence",
    description: "Geospatial risk mapping and cross-regional resource coordination",
  },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BloodFlow AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-red-600 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-red-600 transition-colors">
              About
            </Link>
            <Link href="/auth" className="text-gray-600 hover:text-red-600 transition-colors">
              Sign In
            </Link>
          </nav>
          <Link href="/auth">
            <Button className="bg-red-600 hover:bg-red-700">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge className="mb-4 bg-red-100 text-red-700 hover:bg-red-100">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Blood Management
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Predict Blood Shortages
              <span className="text-red-600 block">Before They Happen</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI system that forecasts blood demand, prevents shortages, and saves lives through
              intelligent resource allocation and predictive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Intelligent Blood Management</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advanced AI algorithms and real-time data processing to revolutionize blood bank operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardHeader>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Save Lives?</h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join leading healthcare organizations using BloodFlow AI to prevent shortages and optimize blood
              distribution.
            </p>
            <Link href="/auth">
              <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-3">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BloodFlow AI</span>
            </div>
            <div className="text-gray-400">© 2024 BloodFlow AI. Saving lives through intelligent prediction.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Users,
  Droplets,
  Bell,
  Calendar,
  MapPin,
  Phone,
  Mail,
  BarChart3,
  LineChart,
  Clock,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"
import { motion } from "framer-motion"

// Add new imports for enhanced features
import { MapPinIcon, Smartphone, Shield, Zap, Brain, Globe2, QrCode } from "lucide-react"

// Sample data for demo
const bloodInventory = [
  { type: "O+", current: 45, required: 60, status: "low", color: "#ef4444" },
  { type: "A+", current: 78, required: 50, status: "good", color: "#22c55e" },
  { type: "B+", current: 32, required: 40, status: "critical", color: "#dc2626" },
  { type: "AB+", current: 25, required: 20, status: "good", color: "#22c55e" },
  { type: "O-", current: 15, required: 30, status: "critical", color: "#dc2626" },
  { type: "A-", current: 28, required: 25, status: "good", color: "#22c55e" },
  { type: "B-", current: 12, required: 20, status: "low", color: "#ef4444" },
  { type: "AB-", current: 8, required: 10, status: "low", color: "#ef4444" },
]

const demandForecast = [
  { day: "Mon", predicted: 85, actual: 82 },
  { day: "Tue", predicted: 92, actual: 89 },
  { day: "Wed", predicted: 78, actual: 75 },
  { day: "Thu", predicted: 95, actual: 98 },
  { day: "Fri", predicted: 88, actual: 85 },
  { day: "Sat", predicted: 72, actual: 70 },
  { day: "Sun", predicted: 65, actual: null },
]

const alerts = [
  {
    id: 1,
    type: "critical",
    message: "B- blood type critically low (12 units remaining)",
    time: "2 minutes ago",
    action: "Schedule emergency drive",
  },
  {
    id: 2,
    type: "warning",
    message: "O+ demand spike predicted for tomorrow (+25%)",
    time: "15 minutes ago",
    action: "Contact donors",
  },
  {
    id: 3,
    type: "info",
    message: "Successful blood drive completed - 45 new units",
    time: "1 hour ago",
    action: "Update inventory",
  },
]

const upcomingDrives = [
  {
    id: 1,
    location: "Central Community Center",
    date: "Tomorrow, 9:00 AM",
    expectedDonors: 25,
    targetTypes: ["O-", "B-"],
  },
  {
    id: 2,
    location: "University Campus",
    date: "Dec 28, 2:00 PM",
    expectedDonors: 40,
    targetTypes: ["A+", "O+"],
  },
]

// Add new data for enhanced analytics
const enhancedPredictions = [
  {
    factor: "Climate Data",
    impact: "High",
    description: "Monsoon season increases accident rates by 35%",
    confidence: 0.92,
    bloodTypes: ["O+", "O-"],
  },
  {
    factor: "Social Events",
    description: "Music festival this weekend - 50K attendees",
    impact: "Medium",
    confidence: 0.87,
    bloodTypes: ["A+", "B+"],
  },
  {
    factor: "Disease Outbreak",
    description: "Dengue cases rising in District 5",
    impact: "High",
    confidence: 0.94,
    bloodTypes: ["A+", "AB+"],
  },
  {
    factor: "Surgery Backlog",
    description: "Cardiac surgery queue increased 40%",
    impact: "Critical",
    confidence: 0.96,
    bloodTypes: ["O-", "A-"],
  },
]

const geofencedAlerts = [
  {
    id: 1,
    location: "Downtown District",
    bloodType: "A+",
    urgency: "Critical",
    donors: 45,
    distance: "0.8 km",
    waitTime: "5 min",
    incentive: "Free coffee + $10 voucher",
  },
  {
    id: 2,
    location: "University Area",
    bloodType: "O-",
    urgency: "High",
    donors: 23,
    distance: "1.2 km",
    waitTime: "12 min",
    incentive: "Priority parking + Badge",
  },
]

export default function Dashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const criticalCount = bloodInventory.filter((item) => item.status === "critical").length
  const lowCount = bloodInventory.filter((item) => item.status === "low").length
  const totalUnits = bloodInventory.reduce((sum, item) => sum + item.current, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BloodFlow AI</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Central Blood Bank
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Alerts ({alerts.length})
            </Button>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Units</CardTitle>
                <Droplets className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUnits}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  +12% from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Types</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                <p className="text-xs text-muted-foreground">Immediate action required</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline w-3 h-3 mr-1" />
                  +5% this month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">Last 30 days average</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="drives">Blood Drives</TabsTrigger>
            <TabsTrigger value="ai-analytics">AI Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    Critical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          alert.type === "critical"
                            ? "bg-red-500"
                            : alert.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          {alert.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Demand Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    7-Day Demand Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <RechartsLineChart data={demandForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="predicted" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Type Inventory</CardTitle>
                <CardDescription>Current stock levels vs required amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bloodInventory.map((item) => (
                    <div key={item.type} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-lg">{item.type}</span>
                        <Badge
                          variant={
                            item.status === "critical" ? "destructive" : item.status === "low" ? "secondary" : "default"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Current: {item.current}</span>
                          <span>Required: {item.required}</span>
                        </div>
                        <Progress value={(item.current / item.required) * 100} className="h-2" />
                        <div className="text-xs text-gray-500">
                          {item.current >= item.required
                            ? `+${item.current - item.required} surplus`
                            : `${item.required - item.current} units needed`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Prediction Model</CardTitle>
                  <CardDescription>AI-powered forecasting with 94% accuracy</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={demandForecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="predicted" fill="#3b82f6" />
                      <Bar dataKey="actual" fill="#10b981" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                  <CardDescription>Factors influencing demand predictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Seasonal Trends</span>
                    <Badge>High Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Local Events</span>
                    <Badge variant="secondary">Medium Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Weather Patterns</span>
                    <Badge variant="outline">Low Impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Emergency Incidents</span>
                    <Badge>High Impact</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="drives" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Blood Drives
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingDrives.map((drive) => (
                    <div key={drive.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{drive.location}</h4>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {drive.date}
                          </p>
                        </div>
                        <Badge variant="outline">{drive.expectedDonors} donors</Badge>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {drive.targetTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          View Location
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Contact Donors
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donor Notifications</CardTitle>
                  <CardDescription>Smart targeting based on blood type needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Critical Alert Sent</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Emergency notification sent to 45 B- donors within 10km radius
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Mail className="w-3 h-3 mr-1" />
                        Send Follow-up
                      </Button>
                      <Button size="sm" variant="outline">
                        View Responses
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Scheduled Reminder</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Weekly reminder to 120 O+ donors scheduled for tomorrow
                    </p>
                    <Button size="sm" variant="outline">
                      Edit Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="ai-analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Multi-Source AI Predictions
                  </CardTitle>
                  <CardDescription>Machine learning analysis of 15+ data sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enhancedPredictions.map((prediction, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {prediction.factor === "Climate Data" && <Globe2 className="w-4 h-4" />}
                            {prediction.factor === "Social Events" && <Calendar className="w-4 h-4" />}
                            {prediction.factor === "Disease Outbreak" && <AlertTriangle className="w-4 h-4" />}
                            {prediction.factor === "Surgery Backlog" && <Activity className="w-4 h-4" />}
                            {prediction.factor}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{prediction.description}</p>
                        </div>
                        <Badge
                          variant={
                            prediction.impact === "Critical"
                              ? "destructive"
                              : prediction.impact === "High"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {prediction.impact}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex gap-1">
                          {prediction.bloodTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round(prediction.confidence * 100)}% confidence
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                    Geofenced Donor Alerts
                  </CardTitle>
                  <CardDescription>Real-time location-based donor notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {geofencedAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-blue-800">{alert.location}</h4>
                          <p className="text-sm text-blue-700">
                            {alert.bloodType} needed - {alert.donors} donors nearby
                          </p>
                        </div>
                        <Badge
                          variant={alert.urgency === "Critical" ? "destructive" : "secondary"}
                          className="bg-red-100 text-red-800"
                        >
                          {alert.urgency}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.waitTime}
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-green-50 rounded text-sm text-green-800">🎁 {alert.incentive}</div>
                      <Button size="sm" className="mt-3 w-full bg-blue-600 hover:bg-blue-700">
                        <Smartphone className="w-3 h-3 mr-1" />
                        Send AR Navigation
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Blockchain Donor Network
                </CardTitle>
                <CardDescription>Cryptographic health profiles and instant verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <QrCode className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Verified Profiles</h4>
                    <div className="text-2xl font-bold text-green-600 mb-1">1,247</div>
                    <p className="text-sm text-gray-600">Active blockchain credentials</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Instant Verification</h4>
                    <div className="text-2xl font-bold text-blue-600 mb-1">2.3s</div>
                    <p className="text-sm text-gray-600">Average verification time</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Network Rating</h4>
                    <div className="text-2xl font-bold text-purple-600 mb-1">4.8/5</div>
                    <p className="text-sm text-gray-600">Peer review score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
